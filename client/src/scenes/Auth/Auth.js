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

const Auth = () => {
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
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const switchPage = () => {
    setIsSignUp((prevState) => !prevState);
  };
  const handleChange = () => {};
  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <StyledForm>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="first name"
                  label="First Name"
                  autoFocus
                  half
                  onChange={handleChange}
                />
                <Input
                  name="last name"
                  label="Last Name"
                  half
                  onChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              onChange={handleChange}
            />
            <Input
              name="password"
              label="Enter Password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                onChange={handleChange}
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
