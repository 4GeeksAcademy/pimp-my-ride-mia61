import React, { useState } from 'react';

const QuickSearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [License, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setLicense("");
    setEmail("");
    setVerificationCode("");
  };

  const sendVerificationCode = async () => {
    const response = await fetch ("/send-verification-code", {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    });

    if (!response.ok) {
      console.error("Failed to send verification code");
    };
  };

  const handleVerify = async () => {
    
    const response = await fetch("/customer-verify", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verificationCode }),
    });

    if (response.ok) {
      window.location.href = "/customer-work-order/:workOrderId";
    } else {
      console.error("Verification failed"); 
    } 
    // add re-send verification code? redirect to in-progress order only
  };

  return (
    <div>
      <button onClick={openModal}>Quick Search</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <input
              type="text"
              placeholder="License Plate"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendVerificationCode}>Send Verification Code</button>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={handleVerify}>Verify</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickSearchModal;