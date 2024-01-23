import requests
from bs4 import BeautifulSoup


def wiki_scrape(command):
    command = command.lower()
    department = input("What Department? (CSE, MATH) ")
    print(command)

    try:
        user_request = command
        response = requests.get(url="https://mymav.utshare.utsystem.edu/psc/ARCSPRD/EMPLOYEE/SA/c/SSR_STUDENT_FL.SSR_CLSRCH_ES_FL.GBL?Page=SSR_CLSRCH_ES_FL&SEARCH_GROUP=SSR_CLASS_SEARCH_LFF&SEARCH_TEXT=CSE%204317&ES_INST=UTARL&ES_STRM=2242&ES_ADV=N&INVOKE_SEARCHAGAIN=PTSF_GBLSRCH_FLUID" + user_request)

        soup = BeautifulSoup(response.content, 'lxml')
        title = soup.find(id="firstHeading")
        print(title.string)

        body = soup.find(id="mw-content-text").findAll("p")

        paragraph = body[1].get_text()
        last_char = paragraph[-1]
        list_elements = soup.find(id="mw-content-text").find("ul").findAll("li")

        if len(list_elements) > 0 and len(paragraph.split()) < 15:
            for bullets in list_elements:
                print(bullets.get_text())
                return bullets.get_text()
        else:
            print(paragraph)
            return paragraph
    except Exception as e:
        print(e)


if __name__ == "__main__":
    wiki_scrape("What is a United States of America")
    wiki_scrape("What is Soviet Union")
    wiki_scrape("Tell me about Artificial Intelligence")
    wiki_scrape("Tell me about Orange")