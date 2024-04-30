import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/QuickSearchModal.css';

const QuickSearchForm = () => {
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const sendVerificationCode = async () => {
    const payload = JSON.stringify({
      email: email,
      license: license
    });
    console.log("Sending payload", payload);
    const response = await fetch(`${process.env.BACKEND_URL}/api/send-verification-code`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: payload
    });

    if (response.ok) {
      setIsCodeSent(true);
      const data = await response.json();
      console.log('Verification code sent:', data);
    } else {
      const error = await response.json();
      console.error("Failed to send verification code:", error.msg);
    }
  };

  const handleVerify = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/customer-verify`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, license: license, verificationCode: verificationCode }),
    });

    if (response.ok) {
      const data = await response.json();
      actions.verifyCustomer(data)
      navigate(`/customer-work-order/${data.work_order_id}`);
    } else {
      console.error("Verification failed");
    }
  };

  return (
    <div className="container-fluid pt-5 quick-search-container">
      <div className="row justify-content-center">
        <div className="col-8 quick-search-form">
          <input
            type="text"
            className="quick-search-input-field input-group my-3 p-2"
            placeholder="License Plate"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            disabled={isCodeSent}
          />
          <input
            type="email"
            className="quick-search-input-field input-group my-3 p-2"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isCodeSent}
          />
          <button className="send-code-button" onClick={sendVerificationCode}>Send Verification Code</button>
          <input
            type="text"
            className="quick-search-input-field input-group my-3 p-2"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={!isCodeSent}
          />
          <button className="send-code-button" onClick={handleVerify} disabled={!isCodeSent}>Verify</button>
        </div>
      </div>
    </div>
  );
};

export default QuickSearchForm;