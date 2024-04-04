import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const GenerateProgressbar = () => {
	const {store, actions} =useContext(Context);
    
    const stepDescriptions = [
        "Car Accepted",
        "Payment or Insurance Accepted",
        "Payment or Insurance Check Received",
        "Parts Ordered",
        "Parts Delivered",
        "Labor Begin",
        "Car Repair Complete",
        "Car Being Prepared For Pickup",
        "Car Ready For Pickup",
    ];
    
    


	return (	

        <>
            
        </>
	);
};

