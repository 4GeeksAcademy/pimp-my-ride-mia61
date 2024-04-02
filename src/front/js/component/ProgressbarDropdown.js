import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const ProgressbarDropdown = () => {
    const { store, actions } = useContext(Context);

    const statusOptions = [
        "Car Accepted",
        "Insurance Check Received(Payment or Insurance accepted, Payment or Insurance check received)",
        "Parts Ordered",
        "Parts Delivered",
        "Labor Begin",
        "Repair Completed (this should start showing estimate completion date)",
        "Car Being Prepared For Pick Up",
        "Car Ready For Pickup (should generate and send message to the client that he should pick up the car in 48 hours)",
    ];

    //   const [selectedStatus, setSelectedStatus] = useState(
    //     Array(orders.length).fill("")
    //   );

    //   const handleStatusChange = (index, status) => {
    //     const newSelectedStatus = [...selectedStatus];
    //     newSelectedStatus[index] = status;
    //     setSelectedStatus(newSelectedStatus);
    //   };


    return (

        <>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown with Checkboxes
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <form>
                        <div className="dropdown-item">
                            <input className="form-check-input" type="checkbox" id="checkbox1" />
                            <label className="form-check-label" htmlFor="checkbox1">Option 1</label>
                        </div>
                        <div className="dropdown-item">
                            <input className="form-check-input" type="checkbox" id="checkbox2" />
                            <label className="form-check-label" htmlFor="checkbox2">Option 2</label>
                        </div>
                        <div className="dropdown-item">
                            <input className="form-check-input" type="checkbox" id="checkbox3" />
                            <label className="form-check-label" htmlFor="checkbox3">Option 3</label>
                        </div>
                    </form>
                </div>
            </div>



            <td>
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        // id={`statusDropdown${index}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {/* {selectedStatus[index] || "Select Status"} */}
                    </button>
                    <ul
                        className="dropdown-menu"
                    // aria-labelledby={`statusDropdown${index}`}
                    >
                        {statusOptions.map((status, i) => (
                            <li key={i}>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleStatusChange(index, status)}
                                >
                                    {status}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </td>
        </>
    );
};