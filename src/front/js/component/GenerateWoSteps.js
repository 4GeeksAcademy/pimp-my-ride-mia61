import React, { useState } from "react";

export const GenerateWoSteps = ({ progressStages, setProgressStages }) => {
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
        setSelectedSteps(prevSelectedSteps => {
            const index = prevSelectedSteps.indexOf(step);
            let progressbarSteps = index > -1
              ? prevSelectedSteps.filter(item => item !== step)
              : [...prevSelectedSteps, step];

            // Asynchronously notify the parent component of the updated steps
            if (typeof setProgressStages === "function") {
                onSelectedStagesChange(progressbarSteps);
            }

            return progressbarSteps;
        });
    };

    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Progress Bar Steps Included
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        {stepDescriptions.map((step, index) => (
                            <div key={index} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`custom-checkbox-${index}`}
                                    checked={selectedSteps.includes(step)}
                                    onChange={() => handleCheckboxChange(step)}
                                />
                                <label className="form-check-label" htmlFor={`custom-checkbox-${index}`}>
                                    {step}
                                </label>
                            </div>
                        ))}
                        <button className="btn btn-primary mt-3" onClick={() => console.log(selectedSteps)}>Log Selected Stages</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
