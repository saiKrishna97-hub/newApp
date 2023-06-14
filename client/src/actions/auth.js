import * as api from "../api";

export const signUp = (signUpData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(signUpData);
    dispatch({ type: "AUTH", payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (signInData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(signInData);
    dispatch({ type: "AUTH", payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
