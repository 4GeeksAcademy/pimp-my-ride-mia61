import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const GenerateProgressbar = () => {
	const {store, actions} =useContext(Context);
    const [selectedSteps, setSelectedSteps] = useState([]);
    
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

    const handleCheckboxChange = (step) => {
        const index = selectedSteps.indexOf(step);
        if(index> -1) {
            setSelectedSteps(selectedSteps.filter((item) => item !== step));
        } else {
            setSelectedSteps([...selectedSteps,step]);
        }
    };

    
    
    


	return (	
        <div>
            {stepDescriptions.map((step, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedSteps.includes(step)}
                            onChange={() => handleCheckboxChange(step)}
                        />
                        {step}

                    </label>
                </div>
            ))}
            <button onClick={() => console.log(selectedSteps)}>Generate Progress </button>
        </div>
            
	);
};

