import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const {store, actions} =useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.token ? (
                        <button onClick={(e) => actions.logUserOut()} style={{ backgroundColor: "#dc3545", borderColor: "#dc3545", color: "white", marginRight: "10px", cursor: "pointer" }} >
                            Log out
                        </button>
                    ) : (
                        <Link to="/log-in">
                            <button className="btn btn-primary" style={{ backgroundColor: "#007bff", borderColor: "#007bff", color: "white", cursor: "pointer" }} >Log in</button>
                        </Link>
                    )}
				</div>
			</div>
		</nav>
	);
};
