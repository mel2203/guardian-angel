import { AuthContext } from "../AuthContext";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  function login() {
    const isCorrectUsername = username === "lyana@mail.com";
    const isCorrectPassword = password === "iamsigma";
    if (isCorrectPassword && isCorrectUsername) {
      authContext.setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      alert("Incorrect email or password");
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="text-center mb-4">
          <div className="login-icon">🛡</div>
          <h1 className="login-title">Guardian Angel</h1>
          <p className="login-subtitle">
            Boutique Security Suite — staff sign-in
          </p>
        </div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={login} className="w-100">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
