import axios from "axios";

const url = "http://localhost:3001/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (post) => axios.post(url, post);
export const updatedPost = (id, post) => axios.patch(`${url}/${id}`, post);
