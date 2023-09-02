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

databasejob = 'SELECT * from jobs4 where sno != null'
databasejobs = mycursor.execute(databasejob)
        
y=0

while True:
    url = 'https://yandex.com/jobs/vacancies/?text='
    response = requests.get(url)
    getdata = bs(response.text,"html.parser")
    # jobdata = getdata.find_all('div', 'sjci')
    joblink = getdata.find_all('a','lc-jobs-vacancy-card__link')
    
    for job in joblink:
        jobslink = job.get('href')
        # print(jobslink)
        jobdatalink = requests.get('https://yandex.com' + jobslink)
        jobdata = bs(jobdatalink.text,'html.parser')
        title = jobdata.find('div',{'class':'lc-jobs-content-header__header'}).text
        company = 'Yandex'
        location = 'Onsite'
        category = jobdata.find('span',{'class':'Text Text_typography_control-s lc-jobs-tag__label'}).text
        # imgdata = jobdata.find('div',{'class':'jd-clogo'})
        # imglink = imgdata.find('img')
        img = 'https://yastatic.net/q/logoaas/v2/Yandex.svg?single=1&viewBox=1'
        desc = jobdata.find('div',{'class':'lc-jobs-vacancy__description'}).text
        jobtype = 'filltime'
        print(title)
        
        title = str(title).replace("'","")
        # title = str(title).replace(","," ")
        title = str(title).replace("("," ")
        title = str(title).replace(")"," ")
        desc = str(desc).replace("'","")
        # jobslink = str(jobslink).replace("'","")
        # company = str(company).replace("'","")
        location = str(location).replace("'","")
        location = str(location).replace("+","")
        category = str(category).replace("'","")
        # img = str(img).replace("'","")
        jobtype = str(jobtype).replace("'","")
        # print(title)
        
        y=y+1
        jobsdata = (f"INSERT INTO jobs4 (sno,title,desc4,link,company,location,category,imglink,jobtype) VALUE ('{y}','{title}','{desc}','{jobslink}','{company}','{location}','{category}','{img}','{jobtype}')")
        # print(jobsdata)
        mycursor.execute(jobsdata)
        database.commit()
        
    