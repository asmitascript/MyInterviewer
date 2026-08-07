import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
       <span> My</span>Interviewer
      </div>

      <div className="nav-actions">
        <button className="signin">Sign In</button>

        <button className="get-started">
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;