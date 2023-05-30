import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHoriZIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const StyledCard = styled(Card)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  });
  const StyledOverlay = styled("div")({
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  });
  const StyledMedia = styled(CardMedia)({
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  });
  const StyledOverlay2 = styled("div")({
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  });
  const StyledDetails = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  });
  const StyledActions = styled(CardActions)({
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  });
  const StyleTitle = styled(Typography)({
    padding: "0 16px",
  });
  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };
  return (
    <StyledCard>
      <StyledMedia image={post.selectedFile} />
      <StyledOverlay>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </StyledOverlay>
      <StyledOverlay2>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHoriZIcon fontSize="default" />
        </Button>
      </StyledOverlay2>
      <StyledDetails>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </StyledDetails>
      <StyleTitle gutterBottom variant="h5" component="h2">
        {post.title}
      </StyleTitle>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <StyledActions>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltIcon fontSize="small" />
          Like
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            handleDelete(post._id);
          }}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </StyledActions>
    </StyledCard>
  );
};

export default Post;
