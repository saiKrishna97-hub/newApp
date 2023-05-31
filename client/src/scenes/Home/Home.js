import React from "react";
// import { styled } from "@mui/system";
import { Container, Grow, Grid } from "@mui/material";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../actions/posts.js";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId]);
  return (
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
  );
};

export default Home;
