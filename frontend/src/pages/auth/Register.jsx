import { Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Start your AI interview journey</p>
                </div>

                <form className="auth-form">

                    <div className="auth-field">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="First name"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Last name"
                        />
                    </div>

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
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        className="auth-button"
                        type="submit"
                    >
                        Create Account
                    </button>

                </form>

                <div className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/auth/login">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Register;