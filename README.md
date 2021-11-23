# Express-Mongo

THis is a simple REST API server for uploading pdf documenets, and getting them.

# How to start Express-Mongo

## Install

---

### Start this service on your computer

1. Firstly, please make sure you already installed [Node.js](https://nodejs.org/en/), `npm`, `mongodb` on your computer.
2. Run `npm i` to install everything to run this service.
3. Start your `mongodb` on your computer.
4. Copy `.env.example` and rename the copy to `.env` and set values like below.

```
#mongodb settings
MONGODB_URL=mongodb://your_mongodb_address:your_port/
MONGODB_NAME=sample // You can put any name you want
MONGODB_IMAGE_BUCKET_NAME=documents // You can put any name you want

#server settings
PORT=8080
TZ=Asia/Tokyo

```

5. Run `npm run start` to run your server.

## Test

---

### Start this service using docker

1. Firstly, please make sure you already installed [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/get-docker/) on your computer.
2. Copy `.env.example` and rename the copy to `.env` and set values like below.

```
#mongodb settings
MONGODB_URL=mongodb://mongo:27017/
MONGODB_NAME=sample // You can put any name you want
MONGODB_IMAGE_BUCKET_NAME=documents // You can put any name you want

#server settings
PORT=8080
TZ=Asia/Tokyo

```

3. Run `docker-compose up -d` to create docker images and run them

## How to test Express-Mongo

---

### Test it on your computer

After you finish setting it up on your computer, just run `npm run test`

### Test it on docker

After you finish setting it up on docker, just run `docker-compose run --rm server npm run test`

# API endpoints

This service has only the following two endpints.

## POST /documents/upload

---

### Description

This endponit is for saving pdf documents in gridfs of mongodb. **You can upload up to 5 pdf documents, and any other file types won't be saved.**\
Also, **You can't upload a pdf document more than 20MB.**

### Usage

In curl command

```
curl --location --request POST 'localhost:8080/documents/upload' \
--form 'documents=@"yourfilename"'
```

If you want to upload multiple documents, do like the below

```
curl --location --request POST 'localhost:8080/documents/upload' \
--form 'documents=@"yourfilename1"' \
--form 'documents=@"yourfilename2"' \
--form 'documents=@"yourfilename3"'
```

## GET /documents?keyword=

---

### Description

This endponit is for getting up to three pdf documents matched with the keyword from gridfs in mongodb. If you don't set keyword, this endpoint will get latest three pdf documents from gridfs.

### Usage

In curl command

```
curl --location --request GET 'localhost:3000/documents?keyword=yourkeyword'
```

# System architecture

## System architecture diagram

---

![System architecture diagram](/assets/system_architecture.svg)

## Main technologies

---

### Express

A famous, minimal and flexible Node.js web application framework.\
I chose this technology because it's stable enough and rich-featured framework even though it might not be light-weight compared to another technology, such as koa.

### mongoDB/GridFS

Document-oriented database program, and GridFS allows us to save large-size file, more than 16MB, in mongoDB.\
I chose this technology because it's scalable, easy to change schema, also I can add any meta data as much as I want. Also, GridFS can save any types of data, and large-size data as well.\
GridFS might be slower than file system, but file system can't add meta data and there is a limit of the number of files in a directory. Plus, as to RDBMS, basically it's not suitable for storing file such as image, pdf so that's why I chose this technology.

# Remaining tasks/Improvements, etc

## Reamining tasks

---

For now I don't finish everything. I have to do the follwoing remaining tasks at least.

- **Add more mongodb settings**\
  Add the following mongodb settings in docker-compsoe.yml in order to give users an access to mongodb in mongodb container.\
  (These settings are written in .env file but I don't use them at the moment)

```
environment:
      MONGO_INITDB_ROOT_USERNAME:your_username
      MONGO_INITDB_ROOT_PASSWORD:your_password
```

- **Create more tests**\
  Need do edge cases like check upload API can upload 5 files, and can upload until 19.9MB file size, etc. Also, need to do queue test.
- **Implement queue tasks**\
  Set a time out and if server can't deal with multiple API calls within the time out, remove queued task from queue and make a response which tells users like "Server is busy right now. Please wait a moment and try your request again"

## Improvements

---

- **Create authentication process**\
  For now, once server is up, users can call APIs. But in the future if this server save/get senstive information such as user information, need to create authentication process like Oauth2.\
  Users must get access token in the first step, and set this token on each API request.
- **Allow users upload other types of file**\
  Since GridFS can store any other types of file, it can allow users to upload other types of file such as png, mp4, mp3, etc.
- **Create another documents in mongodb**\
  This service has only one GridFS bucket, but mongoDB uses JSON-like documents, and it's API friendly because most likely API response type is JSON. So create another documents like user information, taks/project information(which we want to add more information later. Since mongoDB is schemaless we can modify the document immediately), etc.
- **Create view layer**\
  To offer users the easy way to interact with this service, creating view layer is a good way to do this. (But keep providing API access just in case.)
