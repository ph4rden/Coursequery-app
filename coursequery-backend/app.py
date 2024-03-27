from flask import Flask, request, jsonify
import ratemyprofessor
from bs4 import BeautifulSoup
import requests
from transformers import pipeline
import time
import praw
import os
from dotenv import load_dotenv

app = Flask(__name__)

@app.route('/get_professors', methods=['POST'])
def get_professors_api():
    data = request.json
    ProfessorName = data['ProfessorName']
    professor = ratemyprofessor.get_professor_by_school_and_name(
        ratemyprofessor.get_school_by_name("University of Texas at Arlington"), ProfessorName)
    if professor is not None:
        response = {
            "name": professor.name,
            "department": professor.department,
            "school": professor.school.name,
            "rating": professor.rating,
            "difficulty": professor.difficulty,
            "total_ratings": professor.num_ratings,
            "would_take_again": round(professor.would_take_again, 1) if professor.would_take_again is not None else "N/A"
        }
    else:
        response = {"error": "Professor Not Found"}
    return jsonify(response)

@app.route('/wiki_scrape', methods=['POST'])
def wiki_scrape_api():
    data = request.json
    section = data['section']
    number = data['number']
    try:
        response = requests.get(url="https://catalog.uta.edu/search/?P=" + section + "%20" + number)
        soup = BeautifulSoup(response.content, 'lxml')
        course_description = soup.find('p', class_='courseblockdesc')
        if course_description:
            description = course_description.get_text()
        else:
            description = "Course description not found."
    except Exception as e:
        description = str(e)
    return jsonify({"description": description})

@app.route('/classify_text', methods=['POST'])
def classify_text_api():
    data = request.json
    text = data['text']
    classifier = pipeline("sentiment-analysis")
    start = time.time()
    result = classifier(text)
    end = time.time()
    elapsed_time = end - start
    response = {
        "label": result[0]['label'],
        "score": result[0]['score'],
        "elapsed_time": elapsed_time
    }
    return jsonify(response)


dotenv_path = os.path.join(os.path.dirname(__file__), 'config', '.env')
# Load environment variables from the .env file
load_dotenv(dotenv_path)

reddit = praw.Reddit(
    client_id=os.environ.get('REDDIT_CLIENT_ID'),
    client_secret=os.environ.get('REDDIT_CLIENT_SECRET'),
    user_agent=os.environ.get('REDDIT_USER_AGENT')
)
@app.route('/reddit_scraper', methods=['POST'])
def redditscraper():
    data = request.json
    search_term = data.get('search_term')
    if not search_term:
        return jsonify({"error": "search_term is required"}), 400

    contents = []  # List to store sanitized content of each post
    for submission in reddit.subreddit("all").search(search_term, limit=10):
        # Filter out placeholder content and limit the character count
        if submission.selftext and submission.selftext != "Content not available for this post.":
            # Remove newlines, carriage returns, and trailing commas, then strip
            sanitized_content = submission.selftext.replace('\n', ' ').replace('\r', '').strip().rstrip(',')
            sanitized_content = sanitized_content.replace('"', '')  # Remove double quotes
            if sanitized_content:
                contents.append(sanitized_content)

    # Concatenate all contents into a single string, separated by spaces and ensure it's all on one line
    single_string_content = ' '.join(contents)
    # Limit to 2163 characters
    single_string_content = single_string_content[:2000]

    return single_string_content


if __name__ == '__main__':
    app.run(debug=True)



