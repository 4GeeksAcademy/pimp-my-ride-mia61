import React, { useState } from "react";

export const StatusOptions = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (event) => {
        const { id, checked, value } = event.target;
        if (checked) {
            setSelectedOptions(prevOptions => [...prevOptions, value]);
        } else {
            setSelectedOptions(prevOptions => prevOptions.filter(option => option !== value));
        }
    };

    const handleCreateStatusOptions = (event) => {
        event.preventDefault();
        console.log(selectedOptions); // You can do whatever you want with the selected options here
    };

    return (
        <form>
            <div className="form-group row">
                <div className="col-sm-10">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox1" />
                        <label className="form-check-label" htmlFor="checkbox1">
                            Car Accepted
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox2" />
                        <label className="form-check-label" htmlFor="checkbox2">
                            Insurance Check Received
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox3" />
                        <label className="form-check-label" htmlFor="checkbox3">
                            Parts Ordered
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox3" />
                        <label className="form-check-label" htmlFor="checkbox3">
                            Parts Delivered
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox3" />
                        <label className="form-check-label" htmlFor="checkbox3">
                            Labor Begin
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox3" />
                        <label className="form-check-label" htmlFor="checkbox3">
                            Repair Completed
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox3" />
                        <label className="form-check-label" htmlFor="checkbox3">
                            Car Being Prepared For Pick Up
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="checkbox3" />
                        <label className="form-check-label" htmlFor="checkbox3">
                            Car Ready For Pickup
                        </label>
                    </div>
                </div>
            </div>
            <button className="button btn-primary btn-sml" onClick={handleCreateStatusOptions} >
                Create Status Options. Required!
            </button>
        </form>
    );
};
