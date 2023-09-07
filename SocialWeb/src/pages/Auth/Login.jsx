import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginAPI } from "../../utils/api";
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  const formSubmit = async (event) => {
    event.preventDefault();
    const res = await loginAPI(email, password);
    console.log(res.data.userInfo);
    if (res.status == 200) login(res.data.userInfo);
    else alert(res.message);
  };

  return (
    <div className="login-register">
      <h2>Login Page</h2>
      <form onSubmit={formSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
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
        <button type="submit">Submit</button>
      </form>
      <button>
        <Link to="/register">Create Account</Link>
      </button>
    </div>
  );
}
