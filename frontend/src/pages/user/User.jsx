import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./User.css";

function User() {
  const navigate = useNavigate();

  return (
    <div className="user-layout">

      {/* Sidebar */}
      <aside className="user-sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
          🤖 MyAIInterviewer
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">

          <NavLink
            to="/user/dashboard"
            className="sidebar-link"
          >
            <span>🏠</span>
            Dashboard
          </NavLink>

          <button
            className="sidebar-link"
            onClick={() => navigate("/interview/setup")}
          >
            <span>🎤</span>
            New Interview
          </button>

          <NavLink
            to="/user/interviews"
            className="sidebar-link"
          >
            <span>📋</span>
            Interview History
          </NavLink>

          <NavLink
            to="/user/settings"
            className="sidebar-link"
          >
            <span>⚙️</span>
            Settings
          </NavLink>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="user-main">
        <Outlet />
      </main>

    </div>
  );
}

export default User;
