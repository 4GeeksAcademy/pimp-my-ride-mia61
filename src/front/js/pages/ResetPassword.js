import React, { useState, useContext } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";

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
        const {status, role} = await actions.resetPassword(token, password);
        if (status) {
          setMessage("Password reset successful");
          if (role=="customer"){
            navigate("/customer-log-in");
          }
          else if (role=="user"){
            navigate("/user-log-in");
          }
          console.log (role)
        } else {
          setMessage("Failed to reset password. Please try again.");
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        setMessage("Failed to reset password. Please try again.");
      }
      // try {
      //   const response = await api.post("/reset-password", {
      //     token: token,
      //     new_password: password,
      //   });
  
      //   if (response.status === 200) {
      //     const { userType } = response.data;
      //     setMessage("Password reset successful");
  
      //     // Redirect to the appropriate login page based on the user type
      //     if (userType === "customer") {
      //       navigate("/customer-log-in");
      //     } else if (userType === "user") {
      //       navigate("/user-log-in");
      //     } else {
      //       // Default fallback redirection (e.g., to a general login page)
      //       navigate("/login");
      //     }
      //   } else {
      //     setMessage("Failed to reset password. Please try again.");
      //   }
      // } catch (error) {
      //   console.error("Error resetting password:", error);
      //   setMessage("Failed to reset password. Please try again.");
      // }

    };
  
    return (
      <div>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
            <button type="submit">Reset Password</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  };
  
  export default ResetPassword;
  