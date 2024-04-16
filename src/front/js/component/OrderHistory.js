import React, { useEffect, useState } from "react";

const OrderHistory = ({orders}) => {
  // Defining an array of car status options:
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

  const [selectedStatus, setSelectedStatus] = useState(
    Array(orders.length).fill("")
  );

  const handleStatusChange = (index, status) => {
    const newSelectedStatus = [...selectedStatus];
    newSelectedStatus[index] = status;
    setSelectedStatus(newSelectedStatus);
  };

  return (
    <div>
      <h2>Order History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Make/Model</th>
            <th>Color</th>
            <th>VIN</th>
            <th>Licence Plate</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>
                  {order.first_name} {order.last_name}
                </td>
                <td>
                  {order.make} {order.model}
                </td>
                <td>{order.color}</td>
                <td>{order.vin}</td>
                <td>{order.licence_plate}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id={`statusDropdown${index}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedStatus[index] || "Select Status"}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`statusDropdown${index}`}
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
                <td>
                  {/* <button onClick={() => toggleOrderDetails(index)}>
                    {expandedOrderIndex === index
                      ? "Hide Details"
                      : "Show Details"}
                  </button> */}
                </td>
              </tr>

              {/* {expandedOrderIndex === index && (
                <tr>
                  <td colSpan="3">
                    <div>
                      <p>
                        Additional Customer Information: {order.email}{" "}
                        {order.phone_number}
                      </p>
                      <p>More Details: {order.notes}</p>
                    </div>
                  </td>
                </tr>
              )} */}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
