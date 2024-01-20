const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const storage = require('./helper')
const checkAuthorization = require('./auth')
const upload = multer({ storage: storage });

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;


// Middleware to parse JSON in request body
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

let tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2' },
    // ... more tasks
  ];

// Sample in-memory database (replace this with a real database)
const users = [];

// Task  2 
// Route for reading all tasks
app.get('/tasks',  checkAuthorization('user'), (req, res) => {
    res.json(tasks);
  });
// Route for reading a single task by ID
app.get('/tasks/:id',  checkAuthorization('user'),(req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
  
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  });
// Route for creating a new task
app.post('/tasks', checkAuthorization('user'),(req, res) => {
    const newTask = req.body;
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    res.status(201).json(newTask);
  });
// Route for updating a task by ID
app.put('/tasks/:id',  checkAuthorization('user'),(req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    const index = tasks.findIndex(t => t.id === taskId);
  
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      res.json(tasks[index]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  });
// Route for deleting a task by ID
app.delete('/tasks/:id',  checkAuthorization('admin'),(req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.json({ message: 'Task deleted successfully' });
  });



//task 3

// Define the API endpoint for file uploads
app.post('/upload', upload.array('files', 5), (req, res) => {
    // 'files' in upload.array('files', 5) corresponds to the field name in the form data
  
    // Access the uploaded files
    const uploadedFiles = req.files;
  
    // Process the uploaded files (saved to disk in this example)
    res.json({ message: 'Files uploaded and saved successfully', files: uploadedFiles });
  });


// Serve uploaded files statically (for testing purposes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



//task 4

passport.use(new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
      const user = users.find(u => u.username === username);
  
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return done(err);
        }
  
        if (!result) {
          return done(null, false, { message: 'Incorrect password.' });
        }
  
        return done(null, user);
      });
    }
  ));

  // Serialize user to store in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Deserialize user to retrieve from the session
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
  });
  
// Login endpoint using Passport local strategy
app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    // Generate a JWT token
    const token = jwt.sign({ user: req.user }, 'examplesec', { expiresIn: '20h' });
  
    res.json({ token: token });
  });
  
  // Logout endpoint
  app.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
  });

 // Register endpoint
  app.post('/register', async (req, res) => {
    const { username, password,role } = req.body;
  
    // Check if the username is already taken
    if (users.some(u => u.username === username)) {
      return res.status(409).json({ message: 'Username already taken.' });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user
    const newUser = { id: users.length + 1, username, password: hashedPassword ,role:role};
    users.push(newUser);
  
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  });
  

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});