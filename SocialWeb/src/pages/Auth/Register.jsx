import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserAPI } from "../../utils/api";
import "./login.scss";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  const createUser = async (event) => {
    event.preventDefault();
    // Server request to "/user" POST
    await createUserAPI({ username, email, password })
      .then(() => navigate("/login"))
      .catch((err) => alert(err));
  };

  return (
    <div className="login-register">
      <h2>Register Page</h2>
      <form onSubmit={createUser}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <button>
        <Link to="/login">Have an Account</Link>
      </button>
    </div>
  );
}
