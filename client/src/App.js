import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import Navbar from "./scenes/navBar";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
