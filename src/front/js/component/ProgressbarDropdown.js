import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const ProgressbarDropdown = () => {
	const {store, actions} =useContext(Context);
    
    const statusOptions = [
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