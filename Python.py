import requests
from bs4 import BeautifulSoup as bs
from collections import Counter
import re
import pandas as pd
from datetime import date,timedelta,datetime
import mysql.connector

database = mysql.connector.connect(
    host = 'db4free.net',
    database = 'aurjobs',
    user = 'aajmarket',
    password = 'Jack@7775'
)

mycursor = database.cursor(buffered=True)

y=0

while True:
    url = 'https://www.placementindia.com/job-search/'
    response = requests.get(url)
    getdata = bs(response.text,"html.parser")
    # jobdata = getdata.find_all('div', 'sjci')
    joblink = getdata.find_all('a','job-name')
    
    for job in joblink:
        jobslink = job.get('href')
        # print(jobslink)
        jobdatalink = requests.get(jobslink)
        jobdata = bs(jobdatalink.text,'html.parser')
        title = jobdata.find('div',{'class':'jd-title'}).text
        company = jobdata.find('div',{'class':'jd-cname'}).text
        location = jobdata.find('li',{'class':'location'}).text
        category = jobdata.find('span',{'class':'val'}).text
        imgdata = jobdata.find('div',{'class':'jd-clogo'})
        imglink = imgdata.find('img')
        img = imglink.get('src')
        desc = jobdata.find('div',{'class':'dyn_text_sec'}).text
        jobtype = 'filltime'
        # print(title)
        
        title = str(title).replace("'","")
        # title = str(title).replace(","," ")
        title = str(title).replace("("," ")
        title = str(title).replace(")"," ")
        desc = str(desc).replace("'","")
        jobslink = str(jobslink).replace("'","")
        company = str(company).replace("'","")
        location = str(location).replace("'","")
        location = str(location).replace("+","")
        category = str(category).replace("'","")
        img = str(img).replace("'","")
        jobtype = str(jobtype).replace("'","")
        print(title)
        
        y=y+1
        jobsdata = (f"INSERT INTO jobs4 (sno,title,desc4,link,company,location,category,imglink,jobtype) VALUE ('{y}','{title}','{desc}','{jobslink}','{company}','{location}','{category}','{img}','{jobtype}')")
        # print(jobsdata)
        mycursor.execute(jobsdata)
        database.commit()
        
    