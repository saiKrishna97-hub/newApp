import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8; //this is for to display no posts per a page
    const startIndex = (Number(page) - 1) * LIMIT; //this is to get the starting index on every page
    const total = await PostMessage.countDocuments({}); //this gives total number of posts that are there

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBysearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i"); // here i means where are stating to ignore casesensitive
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post for that Id");
    const updatedPost = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      _id: id,
    };

    await PostMessage.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post for that Id");
    await PostMessage.findByIdAndRemove(id);
    res.status(200).json("Deleted Post Successfully.");
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) return res.json({ message: "User is unathunticated" });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post for that Id");
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const likedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(likedPost);
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
};
