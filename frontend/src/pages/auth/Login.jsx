import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Continue your interview preparation</p>
                </div>

                <form className="auth-form">

                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
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