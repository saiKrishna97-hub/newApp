import axios from "axios";

const API = axios.create({ baseURL: `http://localhost:3001` });

export const fetchPosts = () => API.get("/posts");
export const createPost = (post) => API.post("/posts", post);
export const updatedPost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}/delete`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signUp = (signUpData) => API.post("/users/signUp", signUpData);
export const signIn = (signInData) => API.post("/users/signIn", signInData);
