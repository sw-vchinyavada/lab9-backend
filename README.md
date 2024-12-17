# ISE7106 LAB9 BACKEND

This is a REST Api developed with Node.js ,Express.js, and MongoDB. It includes both Authentication and Authorization
using JWT tokens, it is meant to be as Simple and Secure as possible.

### Available Endpoints:

| Auth | Parameters |
|:----:|:-----:|
| POST /api/user/login | username,password |
| POST /api/user/register | email,username,password,confirm_password |


| Users | Parameters |
|:----:|:-----:|
| GET /api/users | x |
| GET /api/user/:id | x |
| PUT /api/user/:id | email,username,password |
| DELETE /api/user/:id | x |



| Post | Parameters |
|:----:|:-----:|
| POST /api/task | title,status,priority,dueDate |
| PUT /api/task/:id | title,status,priority,dueDate |
| DELETE /api/task/:id | x |
| GET /api/task/:id | x |
| GET /api/tasks ||


# How to install

1. Clone the repo
2. run `npm install` to install dependenices
```
DB_URL=mongodb://username:password@host/rest-api
PORT=4000
```
make sure to change host,username,password according to your mongodb config
5. Finally, start it with `npm start`