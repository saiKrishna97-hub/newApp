import "./index.css";
import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./scenes/Navbar/Navbar";
import Home from "./scenes/Home/Home.js";
import Auth from "./scenes/Auth/Auth.js";
import PostDetails from "./scenes/PostDetails/PostDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={"/posts"} />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={user ? <Navigate to={"/posts"} /> : <Auth />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
