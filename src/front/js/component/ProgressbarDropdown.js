import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const ProgressbarDropdown = () => {
	const {store, actions} =useContext(Context);
    
    const statusOptions = [
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