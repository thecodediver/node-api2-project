const express = require('express');
const Posts = require('../../data/db');

const router = express.Router();

router.post("/", (req, res) => {
  if(req.body.title === undefined || req.body.contents === undefined) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  Posts.insert(req.body)
  .then(res => {
    res.status(201).json(res)
  })
  .catch(err => {
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  })
})

router.post("/:id/comments", (req, res) => {
  Posts.findById(req.params.id)
  .then(data => {
    if(data.length < 1) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    if(req.body.text === undefined) {
      res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    Posts.insertComment(req.body)
    .then(newData => {
      res.status(201).json(newData)
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
  })
})

router.get("/", (req, res) => {
  Posts.find()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  })
})

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
  .then(data => {
    if(data.length < 1) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({ error: "The post information could not be retrieved." })
  })
})

router.get("/:id/comments", (req, res) => {
  Posts.findById(req.params.id)
  .then(data => {
    if(data.length < 1) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    Posts.findCommentById(req.params.id)
    .then(newData => {
      res.status(200).json(newData)
    })
    .catch(err => {
      res.status(500).json({ error: "The comments information could not be retrieved." })
    })
  })
})

router.delete("/:id", (req, res) => {
  Posts.findById(req.params.id)
  .then(data => {
    if(data.length < 1) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Post deleted." })
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" })
    })
  })
})

router.put("/:id", (req, res) => {
  Posts.findById(req.params.id)
  .then(data => {
    if(data.length < 1) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    if(!req.body.title || !req.body.contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    Posts.insert(req.body)
    .then(newData => {
      res.status(200).json(newData)
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be modified." })
    })
  })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be located." })
  })
})

module.exports = router