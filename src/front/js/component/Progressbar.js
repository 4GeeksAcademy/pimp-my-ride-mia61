// Progressbar.js
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/ProgressBar.css";

export const Progressbar = ({ selectedStages }) => {
  const { store, actions } = useContext(Context);
  const [activeStep, setActiveStep] = useState(1);

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

  const handleClick = (stepIndex) => {
    setActiveStep(stepIndex + 1);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="progressBarContainer">
              {selectedStages.map((stageIndex) => (
                <React.Fragment key={stageIndex}>
                  <button
                    className={`stepButton ${stageIndex + 1 <= activeStep ? "completed" : ""}`}
                    onClick={() => handleClick(stageIndex)}
                  >
                    {stageIndex + 1}
                  </button>
                  {stageIndex < Math.max(...selectedStages) && (
                    <div
                      className={`stepConnector ${stageIndex + 1 < activeStep ? "completed" : ""}`}
                    ></div>
                  )}
                  {activeStep === stageIndex + 1 && (
                    <div className="stepDescription">
                      {stepDescriptions[stageIndex]}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
