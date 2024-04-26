import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/ResetPassword.css';

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  console.log("Token:", token);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!token) {
      setMessage("Token is missing or invalid.");
      return;
    }

    try {
      const { status, role } = await actions.resetPassword(token, password);
      if (status) {
        setMessage("Password reset successful");
        if (role == "customer") {
          navigate("/customer-log-in");
        }
        else if (role == "user") {
          navigate("/user-log-in");
        }
        console.log(role)
      } else {
        setMessage("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/* <label htmlFor="password">New Password:</label> */}
            <input
              type="password"
              className="reset-password-input-field"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            {/* <label htmlFor="confirmPassword">Confirm Password:</label> */}
            <input
              type="password"
              className="reset-password-input-field"
              placeholder="Confirm Password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button 
          type="submit"
          className="reset-password-submit-button"
          >
            Reset Password
          </button>
        </form>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
