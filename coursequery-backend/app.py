from flask import Flask, request, jsonify
import ratemyprofessor
from bs4 import BeautifulSoup
import requests
from transformers import pipeline
import time

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

if __name__ == '__main__':
    app.run(debug=True)
