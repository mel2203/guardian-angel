import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <h1>Guardian Angel</h1>
      <p>Security Service</p>
      <Link to="/login">Staff Login</Link>
    </div>
  );
}
