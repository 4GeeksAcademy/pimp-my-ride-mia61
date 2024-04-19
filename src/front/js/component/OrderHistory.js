import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const OrderHistory = ({orders}) => {
  const { store, actions } = useContext(Context)
 

  useEffect(() => { 
    actions.getAllWorkOrders()
  }, [])

  

  // Defining an array of car status options:
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
            <th>Order Id</th>
            <th>Name</th>
            <th>Make/Model</th>
            <th>Color</th>
            <th>VIN</th>
            <th>Licence Plate</th>
            <th>Status</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {store?.orders.map((order, index) => (
            <React.Fragment key={index}>
              
                <tr>
                  
                    <td>
                      <Link to={"/order/details/" + order.id } >
                        {order.id} 
                      </Link>
                    </td>
                  <td>
                    {order.customer.first_name} {order.customer.last_name}
                  </td>
                  <td>
                    {order.make} {order.model}
                  </td>
                  <td>{order.color}</td>
                  <td>{order.vin}</td>
                  <td>{order.license_plate}</td>
                  <td>{order.status}</td>
                  <td>{order.comments.length > 0 ? order.comments[0].message : ""}</td>
                  {/* <td>{order.current_status}</td> */}
                  <td>
                    {/* <div className="dropdown">
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
                    </div> */}
                  </td>
                  <td>
                    {/* <button onClick={() => toggleOrderDetails(index)}>
                      {expandedOrderIndex === index
                        ? "Hide Details"
                        : "Show Details"}
                    </button> */}
                  </td>
                  {/* </Link> */}
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