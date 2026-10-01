import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

import { useState } from "react";

const Register = () => {

  const navigate = useNavigate();

  // Store user inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);


    if (password !== confirmPassword) {
        console.error("Passwords do not match, fill with same password");
        setLoading(false);
        return;
    }

    try {
        console.log({
            firstName,
            lastName,
            email,
            password,
        });
      const response = await fetch(
        "http://localhost:8080/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

    if (!response.ok) {
        if (data.errors?.length > 0) {
            const validationError = data.errors[0];

            const messages = {
            firstName: "First name must be between 3 and 20 characters.",
            lastName: "Last name must be between 3 and 20 characters.",
            email: "Please enter a valid email address.",
            password: "Password must be between 8 and 72 characters.",
            };

            throw new Error(
            messages[validationError.field] || validationError.message
            );
        }

        throw new Error(data.message || "Failed to register");
    }

      // Redirect to Interview page
      navigate(`/auth/login`,);    
    } catch (error) {
        console.log("ERROR:", error);

        if (error.name === "TypeError") {
            setError(
            "Unable to connect to the server. Please check your internet connection and try again."
            );
        } else {
            setError(error.message);
        }
    }finally{
        setLoading(false);
    }
  };

  
    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Start your AI interview journey</p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleRegister}
                >
                    {error && <p className="auth-error">{error}</p>}

                    <div className="auth-field">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

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
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="auth-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
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