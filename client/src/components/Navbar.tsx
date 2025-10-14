import { Link } from "react-router-dom";
import logo from "../assets/visacoach.svg";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/status", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        setLoggedIn(true);
      }
    });
  }, []);

  return (
    <nav>
      <Link to="/">
        <img src={logo} style={{ width: "60px" }} />
        <p
          style={{
            margin: "0 0 0 10px",
            fontSize: "20px",
          }}
        >
          Visa Coach
        </p>
      </Link>
      <div style={{ display: "flex", gap: "2rem" }}>
        <Link to={loggedIn ? "/dashboard" : "/signup"}>
          <button className="mouse-button2">
            {loggedIn ? "Dashboard" : "Sign Up"}
          </button>
        </Link>
        <Link to={loggedIn ? "/account" : "/login"}>
          <button className="mouse-button1">
            {loggedIn ? "Account" : "Log In"}
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
