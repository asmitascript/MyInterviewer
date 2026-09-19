import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

const Login = () => {
     const navigate = useNavigate();

  // Store user inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {
        console.log({
            email,
            password,
        });
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

      // Redirect to Dashboard page
      navigate("/user/dashboard");    
    } catch (error) {
      console.error("Error in Login:", error);
    }
  };
    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Continue your interview preparation</p>
                </div>

                <form className="auth-form"
                onSubmit={ handleLogin }>

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
                    >
                        Login
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