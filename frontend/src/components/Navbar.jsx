import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(MyContext);

  return (
    <nav className="navbar">
      <div className="logo">
        <span>My</span>Interviewer
      </div>

      <div className="nav-actions">
        {user ? (
          <button
            className="signin"
            onClick={() => navigate("/user/dashboard")}
          >
            Go to Dashboard<span class="material-symbols-outlined">
              chevron_right
            </span>
          </button>
        ) : (
          <>
            <button
              className="signin"
              onClick={() => navigate("/auth/login")}
            >
              Log In
            </button>

            <button
              className="get-started"
              onClick={() => navigate("/auth/register")}
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;