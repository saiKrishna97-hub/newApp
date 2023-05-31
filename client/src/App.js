import "./index.css";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./scenes/Navbar/Navbar";
import Home from "./scenes/Home/Home.js";
import Auth from "./scenes/Auth/Auth.js";

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
