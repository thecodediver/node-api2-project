const express = require('express');
const cors = require('cors');
const server = express();

// import routers into server.js
const postsRouter = require('./posts/posts-router');

server.use(cors()) // takes care of CORS errors hopefully
server.use(express.json()); // if req has json in body, it can be parsed and put inside req.body

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Shelter API</h>
    <p>Welcome to the Lambda Shelter API</p>
  `);
});

module.exports = server