import * as api from "../api";

export const getPosts = (page) => async (dispatch) => {
  try {
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);
    dispatch({
      type: "FETCH_ALL",
      payload: { data, currentPage, numberOfPages },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: "FETCH_BY_SEARCH", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatedPost(id, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likedPost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
