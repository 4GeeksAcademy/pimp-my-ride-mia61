import React, { useContext, useEffect } from "react";
import {Context} from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Profile = (props) => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if ( !store.token ) {
            navigate("/log-in");
        }
    }, [store.token, navigate]);
    
    return (
        <div className="d-flex flex-column w-100 align-items-center" >
            <h2>Hello Profile</h2>
            <button
                onClick={(event) => actions.fetchPrivateEndpoint()}>
                click me!
            </button>
            <p>{store.privateData}</p>
        </div>
    );
};