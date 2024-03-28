import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const handleLogIn = async(event) => {
		// Validate theres an email
		// Validate there is a password
		const success = await actions.logIn ({
			email: email,
			password: password
		});
		if (success) Navigate("/profile")

	}

	return (
		<div className="text-center mt-5">
			<form>
				<input 
				type="text" 
				placeholder="email"
				value={email}
				onChange={(event) => setEmail(event.target.value)}/>
				<input 
				type="text" 
				placeholder="email"
				value={password}
				onChange={(event) => setPassword(event.target.value)}/>
				<button type="button" onClick={handleLogIn}>submit</button>


			</form>
		</div>
	);
};
