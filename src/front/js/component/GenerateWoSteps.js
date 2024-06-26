import React, { useState } from "react";

export const GenerateWoSteps = ({ woStages, setWoStages }) => {
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
        "Car is ready for pick-up",
        "Completed"
    ];

    const handleCheckboxChange = (step) => {
        setWoStages(prevSelectedSteps => {
            const index = prevSelectedSteps.indexOf(step);
            let progressbarSteps = index > -1
                ? prevSelectedSteps.filter(item => item !== step)
                : [...prevSelectedSteps, step];

            // Asynchronously notify the parent component of the updated steps
            // if (typeof setWoStages === "function") {
            //     onSelectedStagesChange(progressbarSteps);
            // }

            return progressbarSteps;
        });
    };

    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Please select work order stages:
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        {stepDescriptions.map((step, index) => (
                            <div key={index} className="form-check" style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`custom-checkbox-${index}`}
                                    checked={woStages.includes(step)}
                                    onChange={() => handleCheckboxChange(step)}
                                    style={{ marginRight: '5px' }}
                                />
                                <label className="form-check-label" htmlFor={`custom-checkbox-${index}`} style={{ color: 'black' }}>
                                    {step}
                                </label>
                            </div>
                        ))}
                        {/* <button className="btn btn-primary mt-3" onClick={() => console.log(woStages)}>Log Selected Stages</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
