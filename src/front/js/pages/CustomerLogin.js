import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

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

    const handleResetPassword = async () => {
        try {
            const response = await fetch('/api/forgotpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Password reset email sent!');
            } else {
                throw new Error(data.msg || 'Failed to send reset email');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container pt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.2)' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
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
                            <button className="me-2"
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
                                onClick={handleForgotPassword}
                            >
                                Forgot Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}






// import React, { useContext, useState, useEffect } from "react";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";

// export const CustomerLogin = (props) => {
//     const navigate = useNavigate();
//     const { store, actions } = useContext(Context);
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");

    
// 	const handleLogin = async(event) => {
// 		const success = await actions.logInCustomer({
// 			email: email,
// 			password: password
// 		});
// 		if (success) {
//             navigate("/customer-dashboard");
// 	    } else {
//         alert("Something went wrong, please try again");
//         }
//     }

//     const handleForgotPassword = async () =>{
//         try{
//             await actions.resetPassword (email);
//             alert("Link was sent to your email")
//         } catch (error) {
//             console.error("Failed to reset password");
//             alert ("Failed to reset password. Please try again")
//         }
//     }

//     const sendResetPassword = async () =>{

//     }

//     const generateResetToken = () =>{

//     }

//     return (
// 		<div className="container pt-5 ">
//             <div className="row justify-content-center">
//                 <div className="col-md-6" >
//                     <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.2)' }}>
//                         <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
//                         <div style={{ marginBottom: '20px' }}>
//                             <input
//                                 type="email"
//                                 style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(event) => setEmail(event.target.value)}
//                             />
//                         </div>
//                         <div style={{ marginBottom: '20px' }}>
//                             <input
//                                 type="password"
//                                 style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={(event) => setPassword(event.target.value)}
//                             />
//                         </div>
//                         <div style={{ textAlign: 'center' }}>
//                         <button className="me-2"
//                                 type="button"
//                                 style={{ 
//                                     backgroundColor: '#007bff', 
//                                     color: '#fff', 
//                                     border: 'none', 
//                                     borderRadius: '5px', 
//                                     padding: '10px 20px', 
//                                     cursor: 'pointer',
//                                     boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
//                                     transition: 'box-shadow 0.3s ease',
//                                     outline: 'none',
//                                 }}
//                                 onClick={handleLogin}
//                             >
//                                 Submit
//                             </button>
//                             <button
//                                 type="button"
//                                 style={{ 
//                                     backgroundColor: '#007bff', 
//                                     color: '#fff', 
//                                     border: 'none', 
//                                     borderRadius: '5px', 
//                                     padding: '10px 20px', 
//                                     cursor: 'pointer',
//                                     boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
//                                     transition: 'box-shadow 0.3s ease',
//                                     outline: 'none',
//                                 }}
//                                 onClick={handleForgotPassword}
//                             >
//                                 Forgot Password
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
// 	);
// }