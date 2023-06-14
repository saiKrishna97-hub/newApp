import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { createTheme, styled } from "@mui/system";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Icon from "./icon.js";
import { signIn, signUp } from "../../actions/auth";

const theme = createTheme({
  palette: {
    color: "secondary",
  },
});
const StyledPaper = styled(Paper)({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
});
const StyledForm = styled("form")({
  width: "100%",
  marginTop: theme.spacing(3),
});
const StyledAvatar = styled(Avatar)({
  margin: theme.spacing(1),
  backgroundColor: theme.palette,
});
const StyledSubmit = styled(Button)({
  margin: theme.spacing(3, 0, 2),
});
const StyledGoogleButton = styled(Button)({
  margin: theme.spacing(2, 0, 2),
});
const initalState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState(initalState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log("formData", formData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
    console.log(formData);
  };
  const switchPage = () => {
    setFormData(initalState);
    setIsSignUp((prevState) => !prevState);
    setShowPassword(false);
  };
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;
      // fetching userinfo can be done on the client or the server
      const result = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);
      try {
        dispatch({ type: "AUTH", payload: { result, token } });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  autoFocus
                  half
                  value={formData.firstName}
                  handleChange={handleChange}
                  autoComplete="true"
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  half
                  handleChange={handleChange}
                  value={formData.lastName}
                  autoComplete="true"
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              handleChange={handleChange}
              autoComplete="true"
            />
            <Input
              name="password"
              label="Enter Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                handleChange={handleChange}
              />
            )}
          </Grid>
          <StyledSubmit
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </StyledSubmit>
          <StyledGoogleButton
            type="submit"
            startIcon={<Icon />}
            variant="contained"
            color="primary"
            fullWidth
            onClick={login}
          >
            Google Sign In
          </StyledGoogleButton>
          <Grid container justify="flex-end">
            <Button onClick={switchPage}>
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default Auth;
