import React, { useState, useEffect } from 'react';

const QuickSearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  useEffect(() => {
   openModal();
  }, []);

  const openModal = () => {
    console.log("Opening modal...")
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setLicense("");
    setEmail("");
    setVerificationCode("");
    setIsCodeSent(false);
  };

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
      body: JSON.stringify({ email:email, license:license, verificationCode:verificationCode }),
    });

    if (response.ok) {
      const data = await response.json();
      // const { accessToken } = data;
      const { work_order_id } = data;
      // localStorage.setItem('accessToken', accessToken);
      window.location.href = `/customer-work-order/${data.work_order_id}`;
    } else {
      console.error("Verification failed");
    }
  };

  const overLayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0,7)',
    zIndex: 1000
  };

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1001,
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderRadius: '8px'
  };

  return (
    <div>
      <button onClick={openModal}>Quick Search</button>
      {isOpen && (
        <div style={overLayStyle}>
          <div style={modalStyle}>
            <span className="close" onClick={closeModal}>&times;</span>
            <input
              type="text"
              placeholder="License Plate"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              disabled={isCodeSent}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isCodeSent}
            />
            <button onClick={sendVerificationCode}>Send Verification Code</button>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={!isCodeSent}
            />
            <button onClick={handleVerify} disabled={!isCodeSent}>Verify</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickSearchModal;