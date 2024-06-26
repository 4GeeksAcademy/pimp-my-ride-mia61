import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import '../../styles/Login.css';

export const CustomerLogin = () => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const success = await actions.logInCustomer({ email, password });
        if (success) {
            navigate("/customer-dashboard");
        } else {
            alert("Something went wrong, please try again");
        }
    };

    const handleForgotPassword = async () => {
        try {
            await actions.sendPasswordResetEmail(email, "customer");
            alert("Link was sent to your email");
        } catch (error) {
            console.error("Failed to reset password");
            alert("Failed to reset password. Please try again");
        }
    };

   return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <input
                    type="email"
                    className="login-input-field"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    className="login-input-field"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button
                    type="button"
                    className="login-submit-button"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <a
                    href="#"
                    className="login-forgot-password-link"
                    onClick={handleForgotPassword}
                >
                    Forgot Password?
                </a>
            </div>
        </div>
    );
};