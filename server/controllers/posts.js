import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = PostMessage(post);
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
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post for that Id");
    const post = await PostMessage.findById(id);
    const likedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.status(200).json(likedPost);
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
};
