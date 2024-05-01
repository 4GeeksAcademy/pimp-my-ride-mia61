import React, { useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import '../../styles/CustomerSignUp.css';
import { ValidateEmail, ValidateFirstName, ValidateLastName, ValidatePassword, ValidateAddress, ValidatePhone } from "../component/Validators";


export const CustomerSignup = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [invalidItems, setInvalidItems] = useState([]);

    const handleSignup = async () => {
        let isEmailValid = ValidateEmail(email, setInvalidItems);
        let isFirstNameValid = ValidateFirstName(first_name, setInvalidItems);
        let isLastNameValid = ValidateLastName(last_name, setInvalidItems);
        let isPasswordValid = ValidatePassword(password, setInvalidItems);
        let isAddressValid = ValidateAddress(address, setInvalidItems);
        let isPhoneValid = ValidatePhone(phone, setInvalidItems);
        if (isEmailValid && isFirstNameValid && isLastNameValid && isPasswordValid && isAddressValid && isPhoneValid) {
            const success = await actions.signUpCustomer({
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                address: address
            });
            if (success) {
                navigate("/customer-log-in");
                // handleLogin();
            } else {
                alert("something went wrong");
            }
        } else {
            console.log("Invalid inputs:", invalidItems);

        }
    }

    // const handleLogin = async(event) => {
    // 	const success = await actions.logInCustomer({
    // 		email: email,
    // 		password: password
    // 	});
    // 	if (success) {
    //         navigate("/customer-profile");
    //     } else {
    //     alert("something went wrong");
    //     }
    // }


    return (


        <form onSubmit={(event) => {
            event.preventDefault();
            handleSignup();
        }}>
            {/* <div className="container pt-5 bg-black "> */}
            <div style={{width: '100%', maxWidth: '1000px', margin: '100px auto', padding: '30px', backgroundColor: '#2b2a2a', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)', textAlign: 'center'}}>
                <div className="row justify-content-center">
                    <div className="col-md-6 pb-5 text-light" >
                        <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 50px rgba(255, 255, 255, 0.2)', border: '1px solid white' }}>
                            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome!</h2>
                            <div style={{ marginBottom: '20px' }}>

                                <input
                                    type="email"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                                {invalidItems.includes("email") && <label className="error-label">Invalid email format</label>}
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <input
                                    type="password"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                {invalidItems.includes("password") && <label className="error-label">Invalid Password format</label>}
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <input
                                    type="first_name"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
                                    placeholder="First Name"
                                    value={first_name}
                                    onChange={(event) => setFirst_name(event.target.value)}
                                    required
                                />
                                {invalidItems.includes("first_name") && <label className="error-label">First Name is required</label>}
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <input
                                    type="last_name"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
                                    placeholder="Last Name"
                                    value={last_name}
                                    onChange={(event) => setLast_name(event.target.value)}
                                    required
                                />
                                {invalidItems.includes("last_name") && <label className="error-label">Last Name is required</label>}
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <input
                                    type="phone"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    required
                                />
                                {invalidItems.includes("phone") && <label className="error-label">phone number is required</label>}
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <input
                                    type="address"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
                                    placeholder="Address"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    required
                                />
                                {invalidItems.includes("address") && <label className="error-label">Address is required</label>}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button
                                    type="button"
                                    style={{
                                        backgroundColor: '#6c757d',
                                        marginBottom: '10px',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 20px',
                                        cursor: 'pointer',
                                        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
                                        transition: 'box-shadow 0.3s ease',
                                        outline: 'none',
                                    }}
                                    onClick={handleSignup}

                                >
                                    Submit
                                </button>
                            </div>
                            <div>
                                <Link to='/customer-log-in' className="customer-login-link">Already have an account?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}