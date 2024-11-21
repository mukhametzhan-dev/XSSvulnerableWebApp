


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;


// In-memory storage for comments (JUst an array)
let comments = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Reflected XSS route
app.get('/api/search', (req, res) => {
    console.log("User searched for: " + req.query.q);
    const query = req.query.q || '';
    res.json({ message: `You searched for: ${query}` });
});

// Stored XSS routes
app.get('/api/comments', (req, res) => {
    res.json(comments);
});
app.get('/api/clear' , (req, res) => {
    comments = [];
    console.log("Comments cleared");
    res.json({ message: 'Comments cleared' });
});
app.post('/api/comments', (req, res) => {
    const { comment } = req.body;
    console.log("Stored comment: " + comment);
    comments.push(comment); // Store the comment without sanitization
    res.status(201).json({ message: 'Comment added' });
});
//sending user requests to vulnerable endpoints
app.get('/api/redirect', (req, res) => {
    const { url } = req.query;

    res
        .status(301)
        .redirect
        (url);  // Redirect to the URL specified by the user
}
);
app.post

// For starting  server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
