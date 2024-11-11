const express = require("express");
const auth = require("../Middeware/auth");

const router = express.Router();

const {getBlog,postBlog,putBlog,deleteBlog,getPostById,likePost,addComment,getComments} = require('../Controller/Post')


router.get('/',getBlog)
router.post('/', auth,postBlog)
router.put('/:id',auth,putBlog)
router.get('/:id',getPostById)
router.delete('/:id',auth ,deleteBlog)

// Like a post
router.post("/:id/like", auth, likePost);

// Add a comment to a post
router.post("/:id/comments",auth,addComment);

// Get comments for a post
router.get("/:id/comments",getComments);

module.exports = router
