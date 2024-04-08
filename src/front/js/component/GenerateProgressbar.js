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

    const handleCheckboxChange = (step) => {
        const index = selectedSteps.indexOf(step);
        if (index > -1) {
            setSelectedSteps(selectedSteps.filter((item) => item !== step));
        } else {
            setSelectedSteps([...selectedSteps, step]);
        }
    };






    return (

        <>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            ProgressbarSteps Included
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
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
                            <button onClick={() => console.log(selectedSteps)}>Generate Progress Bar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

