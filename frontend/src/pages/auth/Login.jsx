import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./Auth.css";
import { MyContext } from "../../context/MyContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setUser, setSessionExpired } = useContext(MyContext);

  // Store user inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Error/message
  const [error, setError] = useState("");

  // Show session expired message
  useEffect(() => {
    if (location.state?.sessionExpired) {
      setError("Your session has expired. Please log in again.");

      // Clear navigation state after reading it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to Login");
      }

      // Store logged-in user
      setUser(data.user);

      // Reset expired state
      setSessionExpired(false);

      // Redirect to Dashboard
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Error in Login:", error);

      setError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Continue your interview preparation</p>
        </div>

        {/* Error / Session Expired Message */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >

          <div className="auth-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-forgot">
            <button type="button">
              Forgot Password?
            </button>
          </div>

          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "directing..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;