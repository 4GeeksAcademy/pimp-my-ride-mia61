import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Profile = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (store.localStorageChecked && !store.token) {
            navigate("/log-in");
        }
    }, [store.token, navigate]);

    return (
        <>
            <div className="d-felx flex-column w-100 align-items-center" >
                <h2>Hello Profile</h2>
                <button
                    onClick={(event) => actions.fetchPrivateEndpoint()}>
                        Click me
                </button>
            </div>
        </>
    )
}