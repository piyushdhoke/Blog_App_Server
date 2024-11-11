
const Post = require("../Model/Post")


// Get Blog

let getBlog =  async (req, res) => {
    try {
        // Fetch all posts and populate the 'author' field with only 'username'
        const posts = await Post.find()
          .populate("author", "username") // Only populate 'username' from the 'author' field
          .exec();
    
        // Return the populated posts as a response
        res.status(200).json(posts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "Error fetching posts" });
      }
  }


  const getPostById = async (req, res) => {
    try {
      const postId = req.params.id; // Get the post ID from the request params
      const post = await Post.findById(postId).populate("author", "username")
      
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.json(post); // Return the post data
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  


// Blog Post
let postBlog = async (req, res) => {
    const post = new Post({ ...req.body, author: req.user.userId });
    await post.save();
    res.status(201).json(post);
  }

// update Blog
let putBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body; // Ensure these fields are in req.body
  
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }
  
      const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }


//Blog delete
let deleteBlog = async (req, res) => {
    const { id } = req.params;
  
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      console.log("User ID from token:", req.user.userId);
      console.log("Author ID of post:", post.author);
  
      // Check if the logged-in user is the author of the post
      if (post.author.toString() !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized action" });
      }
  
      await post.deleteOne();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Error deleting post", error });
    }
  }

  let likePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.likes += 1;
      await post.save();
      res.json({ likes: post.likes });
    } catch (error) {
      res.status(500).json({ message: "Error liking post" });
    }
  }


  

// Add a comment to a post
let addComment =  async (req, res) => {
    try {
      const { content } = req.body;
      const post = await Post.findById(req.params.id);
      post.comments.push({ content, author: req.user.id });
      await post.save();
      res.json(post.comments);
    } catch (error) {
      res.status(500).json({ message: "Error adding comment" });
    }
  }
  
  // Get comments for a post
  let getComments = async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ message: "Comment content is required" });
      }
  
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Push the new comment
      post.comments.push({ content, author: req.user.id });
      await post.save();
      
      res.json(post.comments);
    } catch (error) {
      console.error("Error adding comment:", error); // log the error for debugging
      res.status(500).json({ message: "Error adding comment" });
    }
  }
  



module.exports = {getBlog,postBlog,putBlog,deleteBlog,getPostById,likePost,addComment,getComments}