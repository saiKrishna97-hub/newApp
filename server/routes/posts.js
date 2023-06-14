import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", verifyToken, createPost);
router.patch("/:id", verifyToken, updatePost);
router.delete("/:id/delete", verifyToken, deletePost);
router.patch("/:id/likePost", verifyToken, likePost);

export default router;
