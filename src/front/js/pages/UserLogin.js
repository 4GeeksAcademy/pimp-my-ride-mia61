import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const UserLogin = (props) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = async(event) => {
		// validate there is an email
		// validate there is a password
		const success = await actions.logInUser({
			email: email,
			password: password
		});
		if (success) {
            navigate("/user-dashboard");
	    } else {
        alert("something went wrong");
        }
    }



    return (
		<div className="container pt-5 bg-black" style={{ marginTop: '50px', marginBottom: '50px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)' }}>
            {/* Apply animation classes based on formVisible state */}
            <div className="row justify-content-center"  >
                <div className="col-md-6" >
                    <div style={{ marginBottom:'50px', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 50px rgba(255, 255, 255, 0.2)', border: '1px solid white' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Login</h2>
                        <div style={{ marginBottom: '20px' }}>
                            <input
                                type="email"
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <input
                                type="password"
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                        <button
                                type="button"
                                style={{ 
                                    backgroundColor: '#007bff', 
                                    color: '#fff', 
                                    border: 'none', 
                                    borderRadius: '5px', 
                                    padding: '10px 20px', 
                                    cursor: 'pointer',
                                    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
                                    transition: 'box-shadow 0.3s ease',
                                    outline: 'none',
                                }}
                                onClick={handleLogin}
                              
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}