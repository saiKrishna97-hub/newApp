import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import memories from "../../Images/memories.png";
import { styled } from "@mui/system";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createTheme } from "@mui/system";
import { deepPurple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
  const StyledAppBar = styled(AppBar)({
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  });
  const StyledImg = styled("img")({
    marginLeft: "15px",
  });
  const StyledTypography = styled(Typography)({
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
    fontFamily: "Dancing Script",
  });
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  });
  const StyledProfile = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    width: "250px",
  });
  const StyledUserName = styled(Typography)({
    display: "flex",
    alignItems: "center",
  });
  const theme = createTheme({
    palette: {
      color: deepPurple[500],
    },
  });
  const StyledAvatar = styled(Avatar)({
    color: theme.palette,
    backgroundColor: deepPurple[500],
  });
  //   brandContainer: {
  //     display: 'flex',
  //     alignItems: 'center',
  //   },
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // this state helps in automatically setting the data whenever location change happened

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <StyledAppBar position="static" color="inherit">
      <div>
        <StyledTypography component={Link} to="/" variant="h2" align="center">
          Memories
        </StyledTypography>
        <StyledImg src={memories} alt="memories" height="60"></StyledImg>
      </div>
      <StyledToolbar>
        {user?.result ? (
          <StyledProfile>
            <StyledAvatar alt={user?.result.name} src={user?.result.picture}>
              {user?.result.name.charAt(0)}
            </StyledAvatar>
            <StyledUserName variant="h6">{user?.result.name}</StyledUserName>
            <Button color="secondary" onClick={logout} variant="contained">
              Logout
            </Button>
          </StyledProfile>
        ) : (
          <Button
            component={Link}
            to="/auth"
            color="primary"
            variant="contained"
          >
            Sign In
          </Button>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
