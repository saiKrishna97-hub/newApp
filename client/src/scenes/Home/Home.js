import React from "react";
// import { styled } from "@mui/system";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../actions/posts.js";
import Paginate from "../Paginate/Paginate.js";
import { MuiChipsInput } from "mui-chips-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const StyledAppBar = styled(AppBar)({
  borderRadius: 4,
  marginBottom: "1rem",
  display: "flex",
  padding: "16px",
});
const StyledPagination = styled(Paper)({
  borderRadius: 4,
  marginTop: "1rem",
  padding: "16px",
});

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId]);
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAdd = (chip) => setTags([...tags, chip]);
  const handleDelete = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledAppBar position="static" color="inherit">
              <TextField
                name="search"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <MuiChipsInput
                style={{ margin: "10px 0" }}
                label="Search Tags"
                onAddChip={(chip) => handleAdd(chip)}
                onDeleteChip={(chip) => handleDelete(chip)}
                value={tags}
              />
              <Button variant="contained" color="primary" onClick={searchPost}>
                Search
              </Button>
            </StyledAppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <StyledPagination elevation={6}>
              <Paginate />
            </StyledPagination>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
