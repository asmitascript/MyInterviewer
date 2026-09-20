import "./Navbar.css";


import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="logo">
       <span> My</span>Interviewer
      </div>

      <div className="nav-actions">
        <button className="signin"
         onClick={() => {
          navigate("/auth/login");
         }}
        >Log In</button>

        <button className="get-started"
         onClick={() => {
          navigate("/auth/register");
        }}>
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;