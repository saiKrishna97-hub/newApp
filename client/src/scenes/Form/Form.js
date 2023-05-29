import React, { useEffect, useState } from "react";
import { Typography, Paper, TextField, Button } from "@mui/material";
import FileBase from "react-file-base64";
// import "./style.js";
import { createTheme } from "@mui/system";
import { styled } from "@mui/system";
import { createPost, updatePost } from "../../actions/posts.js";
import { useDispatch, useSelector } from "react-redux";

const theme = createTheme({});
const StyledPaper = styled(Paper)({
  padding: theme.spacing(2),
  boxShadow: 12,
});
const StyledForm = styled("form")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});
const StyledFileInput = styled("div")({
  width: "97%",
  margin: "10px 0px",
});
const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };
  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <StyledPaper>
      <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          sx={{ margin: theme.spacing(1) }}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(event) =>
            setPostData({ ...postData, creator: event.target.value })
          }
        />
        <TextField
          sx={{ margin: theme.spacing(1) }}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(event) =>
            setPostData({ ...postData, title: event.target.value })
          }
        />
        <TextField
          sx={{ margin: theme.spacing(1) }}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(event) =>
            setPostData({ ...postData, message: event.target.value })
          }
        />
        <TextField
          sx={{ margin: theme.spacing(1) }}
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(event) =>
            setPostData({ ...postData, tags: event.target.value })
          }
        />
        <StyledFileInput>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
          <Button
            sx={{ marginBottom: 1 }}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </StyledFileInput>
      </StyledForm>
    </StyledPaper>
  );
};

export default Form;
