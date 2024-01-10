# IITJ Forum

This is a web app where people of IIT Jodhpur can post questions and ...

## Table of Contents

- [ER diagram](#er-diagram)
- [API Reference](#api-reference)
  - [Auth](#auth)
  - [Feed](#feed)
  - [Profile](#profile)
- [Mongoose Schema](#mongoose-schema)
  - [User Table](#user-table)
  - [Profile Table](#profile-table)
  - [Question Table](#question-table)
  - [Answer Table](#answer-table)
  - [Comment Table](#comment-table)
  - [Reply Table](#reply-table)
  - [LikeDislike Table](#likedislike-table)
- [How to install](#how-to-install)

# ER diagram

To be Updated

# Screenshots
### Login/SignUp
![Screenshot 2024-01-07 192518](https://github.com/MagnusCarlsen26/Forum-For-IITJ/assets/102711133/104fada9-4162-490e-9275-ac2da701280c)
![Screenshot 2024-01-07 192920](https://github.com/MagnusCarlsen26/Forum-For-IITJ/assets/102711133/864c840a-9a82-4255-badf-e3fc28c729cd)
![Screenshot 2024-01-07 192959](https://github.com/MagnusCarlsen26/Forum-For-IITJ/assets/102711133/f125aa62-a9e5-4d24-98ef-d692c2efe2db)

### Feed
![Screenshot 2024-01-07 193030](https://github.com/MagnusCarlsen26/Forum-For-IITJ/assets/102711133/d6f80614-3308-418f-961a-9171a44c24e5)
![Screenshot 2024-01-07 193346](https://github.com/MagnusCarlsen26/Forum-For-IITJ/assets/102711133/7c9e8867-31d2-4778-bc54-c93d713efac8)
![Screenshot 2024-01-07 200250](https://github.com/MagnusCarlsen26/Forum-For-IITJ/assets/102711133/31bb4b0f-7f68-436f-8503-2973af60427f)

### Profile
![image](https://github.com/MagnusCarlsen26/Forum-For-IITJ/assets/102711133/814cf04c-d935-4920-886e-f654f091cf64)

## API Reference

### Auth
```http
  POST /auth/register Handles        |  Registration of a given user
  POST /auth/otp                     |  sends otp to the given email for verification
  POST /auth/forgot                  |  In devlopment
  POST /auth/login                   |  Handles Login of a given user
```
### Feed
```http
  POST /feed/question                |  Saves new question in Db
  POST /feed/answer                  |  Saves new Answer in Db
  POST /feed/comment                 |  Saves new Comment in Db
  POST /feed/reply                   |  Saves new Reply in Db
  POST /feed/reply                   |  Saves new Reply in Db
  POST /feed/viewQuestion            |  Fetches all details of a question
  POST /feed/viewAllQuestions        |  Fetches all questions and 1 answer from the given category
  POST /feed/search                  |  Fetches most releavant question with respect to question searched
  POST /feed/likeDislikeFetch        |  Fetches Like/Dislike info of a given user for a given item (question/answer/comment/reply)
  POST /feed/likeDislikeUpdateUser   |  Updates Like/Dislike info of a given user for a given item (question/answer/comment/reply)
  POST /feed/likeDislikeUpdatePost   |  Updates Like/Dislike Count for a given item (question/answer/comment/reply)
```
### Profile
```http
  POST /profile/update               | Updates info of a given user
  POST /profile/getUser              | Fetches Info of a given user
```

## Mongoose Schema

The Database is in 3rd Normal Form. Hence the Schemas are efficient.

### User Table 
    username : string
    email : string    Primary Key
    password : string
### Profile Table
    email: string    Primary key
    username: string 
    year: Number
    program: string 
    Branch: string
    skills: string   
    linkedIn: string
    instagram: string    
    gitHub: string
    phone: string
    age: Number 
    rollNo: string
    hobbies: string
    aboutMe: string
    profilePicture: string
    bannerPicture: string
### Question Table
    question : string 
    author : string
    time: string
    category: string
### Answer Table
    answer : string
    questionID: string  Foreign Key
    author : string
    time: string
    likes: Number
    dislikes: Number
### Comment Table
    comment : string
    answerID: string    Foreign Key
    author : string
    time: string
    likes: string
    dislikes: string 
### Reply Table
    reply : string
    commentID: string   Foreign Key
    author : string
    time: string
    likes: string
    dislikes: string
### LikeDislike Table
    id : string         Foreign Key
    author : string                 
    like : Number
    dislike : Number
## How to install

Step 1 : Clone the repository

```http
    git clone https://github.com/MagnusCarlsen26/Forum-For-IITJ.git
```
Step 2: Create Your MongoDB Account and Database/Cluster
Create your own MongoDB account by visiting the MongoDB website and signing up for a new account.

Create a new database or cluster by following the instructions provided in the MongoDB documentation. Remember to note down the "Connect to your application URI" for the database, as you will need it later. Also, make sure to change <password> with your own password

add your current IP address to the MongoDB database's IP whitelist to allow connections (this is needed whenever your ip changes)

Step 3 : Run Client

Run the following commands from root
```http
    cd client
    npm i
    npm start
```
This command will start the frontend server, and you'll be able to access the website on localhost:3000 in your web browser.
Step 4 : Run Server

Run the following commands from root
```http
    cd server
    npm i
    npm start
```

