import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserProfile from "./pages/User Profile/UserProfile";
import Profile from "./components/Profile";
import Feed from "./pages/Feed/Feed";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import FollowFeed from "./pages/Follow Feed/followFeed";

function App() {
  const { userInfo } = useAuth();
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  return (
    <div id="Wrapper">
      {userInfo && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/allfeed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/followfeed"
          element={
            <ProtectedRoute>
              <FollowFeed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:user_id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      {/* {userInfo} */}
    </div>
  );
}

export default App;
