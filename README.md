

# Deployment

AWS EC2 Deployed link -- http://ec2-3-106-193-190.ap-southeast-2.compute.amazonaws.com:8081/

## Setup
Run the following commands in this order
```sh
git clone https://github.com/LovedeepSingh19/github-api-fetch-project
cd github-api-fetch-project
npm install

cd server
npm install
npm start
```
After running all these commands server must be running on port 3000 of your localhost or any other ip provided
Also populate .env file from root directory by adding your ip address or using localhost.

Open a new terminal and run
```sh
npm start
```
Now the frontend will also be running on port 8080.

Note:- in deployment i've mapped port 8080 of the ocntainer to port 8081 of the EC2 machine as jenkins was running on port 8080

## 🚀 How to use

- To use application enter the username of profile.
- It'll redirect to next page showing all the repositories of that profile.
- You can choose how many repo's per page will be shown to you, just by entering an interger number in the page field.
- The repo's are fetched from a nodejs server which send a server side rendered html page component that loaded on the profile page.

## 📝 Application Overview

- Its a vanila js application that's used to fetch public repositories of any user on github
- Its deployed on an EC2 machine on AWS using docker container.
- Uses server side rendered paging to show results of queries.
