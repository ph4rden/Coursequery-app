import ratemyprofessor
import requests
from bs4 import BeautifulSoup


ProfessorName = input("Enter Professor Name: ")


professor = ratemyprofessor.get_professor_by_school_and_name(
    ratemyprofessor.get_school_by_name("University of Texas at Arlington"), ProfessorName)
if professor is not None:
    print("%s works in the %s Department of %s." % (professor.name, professor.department, professor.school.name))
    print("Rating: %s / 5.0" % professor.rating)
    print("Difficulty: %s / 5.0" % professor.difficulty)
    print("Total Ratings: %s" % professor.num_ratings)
    if professor.would_take_again is not None:
        print(("Would Take Again: %s" % round(professor.would_take_again, 1)) + '%')
    else:
        print("Would Take Again: N/A")
else:
    print("Professor Not Found")



def wiki_scrape():
    section = input("Enter the section of the class (CSE, MATH): ")
    number = input("Enter the number of the class (3313, 2415): ")

    try:
        response = requests.get(url="https://catalog.uta.edu/search/?P=" + section + "%20" + number)
        soup = BeautifulSoup(response.content, 'lxml')

        # Find the course description
        course_description = soup.find('p', class_='courseblockdesc')

        if course_description:
            print(course_description.get_text())
            return course_description.get_text()
        else:
            print("Course description not found.")
            return None
    except Exception as e:
        print(e)

# Example usage
wiki_scrape()
