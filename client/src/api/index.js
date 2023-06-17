import axios from "axios";

const API = axios.create({ baseURL: `http://localhost:3001` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (post) => API.post("/posts", post);
export const updatedPost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}/delete`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signUp = (signUpData) => API.post("/users/signUp", signUpData);
export const signIn = (signInData) => API.post("/users/signIn", signInData);
