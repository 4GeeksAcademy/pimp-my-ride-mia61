import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/ProgressBar.css";

export const Progressbar = () => {
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
    "Completed"
  ];




  const handleClick = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="progressBarContainer">
              {[...Array(9).keys()].map((index) => (
                <React.Fragment key={index}>
                  <button
                    className={`stepButton ${index + 1 <= activeStep ? "completed" : ""}`}
                    onClick={() => handleClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                  {index < 8 && (
                    <div
                      className={`stepConnector ${index + 1 < activeStep ? "completed" : ""}`}
                    ></div>
                  )}
                  {activeStep === index + 1 && (
                    <div className="stepDescription">
                      {stepDescriptions[index]}
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
