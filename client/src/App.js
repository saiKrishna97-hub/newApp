import "./index.css";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import memories from "./Images/memories.png";
import Posts from "./scenes/Posts/Posts.js";
import Form from "./scenes/Form/Form.js";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../src/actions/posts.js";
import { styled } from "@mui/system";

function App() {
  const [currentId, setCurrentId] = useState(0);
  const StyledAppBar = styled(AppBar)({
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  });
  const StyledImg = styled("img")({
    marginLeft: "15px",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId]);
  return (
    <Container maxWidth="lg">
      <StyledAppBar position="static" color="inherit">
        <Typography
          sx={{ color: "rgba(0, 183, 255, 1)" }}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <StyledImg src={memories} alt="memories" height="60"></StyledImg>
      </StyledAppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={8}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
