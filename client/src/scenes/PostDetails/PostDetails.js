import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigation } from "react-router-dom";
import { createTheme, styled } from "@mui/system";
import { getPost } from "../../actions/posts";

const PostDetails = () => {
  const theme = createTheme({});
  const StyledImage = styled("img")({
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  });
  const StyledCard = styled("div")({
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  });
  const StyledSection = styled("div")({
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  });
  const StyledImageSection = styled("div")({
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  });
  const StyledPaper = styled(Paper)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  });
  const { post, isLoading } = useSelector((state) => state.posts);
  const { id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigation();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  if (!post) return null;
  if (isLoading) {
    return (
      <StyledPaper elevation={6}>
        <CircularProgress size="7em" />
      </StyledPaper>
    );
  }
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <StyledCard>
        <StyledSection>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </StyledSection>
        <StyledImageSection>
          <StyledImage
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </StyledImageSection>
      </StyledCard>
    </Paper>
  );
};

export default PostDetails;
