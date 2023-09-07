import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./navbar.scss";

export default function Navbar() {
  const { userInfo } = useAuth();

  return (
    <nav>
      <NavLink
        style={({ isActive }) => {
          return isActive ? { backgroundColor: "#222" } : {};
        }}
        to="/profile"
        state={userInfo}
      >
        Profile
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return isActive ? { backgroundColor: "#222" } : {};
        }}
        to="/allfeed"
      >
        Feed
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return isActive ? { backgroundColor: "#222" } : {};
        }}
        to="/followfeed"
      >
        Following
      </NavLink>
    </nav>
  );
}
