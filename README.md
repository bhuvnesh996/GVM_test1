
#############How to run#########################
##### make sure you have nodemon ##################
1. git clone the repo 
2. npm install 
3. npm start 

## PACKAGE USED ###################33
   "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0"
    "nodemon"






Section 1: General Node.js Knowledge

1.1. Node.js is a JavaScript runtime built on the V8 JavaScript engine. It allows developers to execute JavaScript code server-side, enabling the development of scalable and high-performance network applications. Unlike traditional server-side technologies like PHP or Java, Node.js uses a non-blocking, event-driven model, making it efficient for handling concurrent connections.

1.2. Event-driven programming in Node.js is based on the idea of handling asynchronous operations through events and callbacks. In this model, events trigger the execution of associated callback functions.

1.3. The package.json file in a Node.js project serves as a manifest for the project, containing metadata, project configuration, and dependencies. It includes information such as the project name, version, entry point, scripts, and dependencies.

1.4. Callback hell, or the "pyramid of doom," occurs when multiple nested callbacks are used, leading to code that is difficult to read and maintain. Promises or async/await can mitigate this issue in Node.js applications by providing a more structured and readable way to handle asynchronous operations.

1.5. npm (Node Package Manager) is a package manager for Node.js. It is commonly used to install, manage, and share packages (libraries or modules) in Node.js projects. npm also helps in managing project dependencies and running scripts defined in the package.json file.

2.1 Created on code base check file Index.js

2.2 Set up routes for TASK endpoint are below 
    1. GET /tasks  to get all task  
    2. GET /tasks/:id to get single task from database make sure you pass valid ID 
    3. POST /tasks to create task make sure you pass title and decreption in body 
    4. PUT /tasks/:id update the existing task with new data, make sure you pass ID 
    5. DELETE /tasks/:id delete a specific task by passing its ID

2.3 Implemented in-momory storage check index.js file on line number 34

3.1 Endpoint for file upload 
    1. POST /uploads  accept file in body make sure you pass file till 5
  
3.2. File storage and organization on the server depend on the requirements. You might save files in a designated folder or use a cloud storage service.
Well normally cloud storage service are prefered , its stupid to server or handle static files in code 

3.3. Example request using curl:
curl -X POST -F "files=@file1.txt" -F "files=@file2.txt" http://localhost:3000/upload




4.1 Created middleware function to check for authentication you can check the function in auth.js file

4.2 Created register endpoint 
    1. POST /register make sure you pass data in body it accept username, password ,and role 
    ###REMEBER THERE ARE ONLY TWO ROLES USER AND ADMIN MAKE SURE YOU DEFINE ROLE WHEN CREATING USER #######

4.3 Created login endpoint
    1. POST /login make sure you pass username and password in body

4.4. When storing user passwords in a database, it's crucial to hash the passwords using a strong hashing algorithm, and it's recommended to use a      unique salt for each user. In the example above, the bcrypt library is used to hash passwords with a salt automatically.

4.5. Provide a sample API request:
curl -X POST -d '{"username": "user1", "password": "password1"}' -H "Content-Type: application/json" http://localhost:3000/register
curl -X POST -d '{"username": "user1", "password": "password1"}' -H "Content-Type: application/json" http://localhost:3000/login
curl -H "Authorization: Bearer <your_token>" http://localhost:3000/some-protected-endpoint






5.1. Authorization in the context of a Node.js application refers to the process of granting or denying access to certain resources or actions based on the identity or role of the user. It involves determining what actions a user is allowed to perform within the application.

In a Node.js application, authorization typically follows successful authentication. After authenticating a user (verifying their identity), authorization mechanisms ensure that the authenticated user has the necessary permissions to perform specific actions or access certain parts of the application.

5.2 Created middleware function to check user is authorize or not you can check in auth.js file  

5.3. In the code above, the checkAuthorization middleware is used to enforce role-based authorization. This middleware checks if the authenticated user has the required role to access a specific route. If the user has the required role, the request is allowed to proceed to the route handler. If not, a 403 Forbidden response is sent.

This middleware is then applied to the routes where role-based authorization is needed, such as creating, updating, or deleting tasks. The checkAuthorization('user') middleware allows only users with the "user" role, and checkAuthorization('admin') allows only users with the "admin" role.



7.0. Key Takeaways:

    1. Node.js Fundamentals: Understanding of key concepts in Node.js, including event-driven programming, Express for building APIs, and working with middleware.

    2. CRUD Operations: Implementing CRUD operations is a fundamental aspect of building web applications. Creating, reading, updating, and deleting resources (CRUD) is essential for interacting with data.

    3. File Uploads: Handling file uploads is a common requirement in many applications. multer is a popular middleware for managing file uploads in Node.js.

    4. Authentication and Authorization: Implementing user authentication using Passport.js, JWT for secure authentication, and role-based authorization adds a layer of security to applications.