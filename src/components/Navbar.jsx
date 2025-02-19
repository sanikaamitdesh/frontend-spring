import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo"><Link to="/">FullStackApp</Link></h1>
      <div className="nav-links">
        {/* <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link> */}
      </div>
    </nav>
  );
}
