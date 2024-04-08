import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const GenerateProgressbar = () => {
    const { store, actions } = useContext(Context);
    const [selectedSteps, setSelectedSteps] = useState([]);

    const stepDescriptions = [
        "Car accepted",
        "Supplement sent to insurance",
        "Supplement approved",
        "Check received from Insurance",
        "Parts Ordered",
        "Parts Delivered",
        "Labor in Progress",
        "Labor completed, car is being prepared for pick-up",
        "Car is ready for pick-up"
    ];

    const preSelectedSteps = [
        "Car Accepted",
        // "Payment or Insurance Accepted",
        // "Payment or Insurance Check Received",
        // "Parts Ordered",
        // "Parts Delivered",
        "Labor Begin",
        "Car Repair Complete",
        "Car Being Prepared For Pickup",
        "Car Ready For Pickup",
    ];

};