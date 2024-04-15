import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext";
import { CustomerWorkOrder } from "./CustomerWorkOrder";
import { BiSort } from "react-icons/bi";

export const CustomerDashboard = () => {

    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [customer, setCustomer] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        id: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const getCurrentCustomer = async () => {
            let data = await actions.getCurrentCustomer()
            let result = await actions.getCustomerWorkOrdersByCustomer()
                setCustomer(data)
        }
        try {
            if (!sessionStorage.getItem("token") || !sessionStorage.getItem("customerId")) {
                navigate("/customer-log-in");
            } else {
                getCurrentCustomer();
            }
        } catch (err) {
            console.error(err);
        }
    }, []);



    const handleEditSubmit = async () => {
        let result = await actions.editCustomerbyCustomer(customer);
        if (result) {
            setEditMode(false);
        } else {
            alert("Failed to update user data");
        }
    };


    return (
        <div className="container pt-5">
            <h2>Welcome to Customer Dashboard</h2>
            {customer.id != null ? (
                <div>
                    {editMode ?
                        (
                            <div>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={customer.first_name}
                                    onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    value={customer.last_name}
                                    onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={customer.email}
                                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={customer.phone}
                                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="address"
                                    value={customer.address}
                                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                />
                                <button onClick={handleEditSubmit}>Save</button>
                            </div>
                        ) :
                        (
                            <div>
                                <p><strong>Email:</strong> {customer.email}</p>
                                <p><strong>First Name:</strong> {customer.first_name}</p>
                                <p><strong>Last Name:</strong> {customer.last_name}</p>
                                <p><strong>Phone:</strong> {customer.phone}</p>
                                <p><strong>Address:</strong> {customer.address}</p>
                                <button onClick={() => setEditMode(true)}>Edit</button>
                            </div>
                        )}
                        <div>
                <h2>Order History</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Make/Model</th>
                            <th>Color</th>
                            <th>VIN</th>
                            <th>License Plate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.customerWorkOrders.map((order, index) => (
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
                                    <td>{order.license_plate}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                id={`statusDropdown${index}`}
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {order.wo_stages[index] || "Select Status"}
                                            </button>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby={`statusDropdown${index}`}
                                            >
                                                {order.wo_stages.map((status, i) => (
                                                    <li key={i}>
                                                        <button
                                                        disabled
                                                        >
                                                            {status}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            
        </div>
    );

    // return (
    //     <div className="customer-dashboard">

    //         <div className="profile-form, container pt-5">
    //             <h2>Welcome to Customer Dashboard!</h2>
    //             {data ? (
    //                 <div>
    //                     <p><strong>Email:</strong> {customerId.data.email}</p>
    //                     <p><strong>First Name:</strong> {customerId.data.first_name}</p>
    //                     <p><strong>Last Name:</strong> {customerId.data.last_name}</p>
    //                     <p><strong>Phone:</strong> {customerId.data.phone}</p>
    //                     <p><strong>Address:</strong> {customerId.data.address}</p>
    //                 </div>
    //             ) : (
    //                 <p>Loading user data...</p>
    //             )}
    //         </div>

    //         <h2>Work Orders</h2>
    //         <CustomerWorkOrder customerId={store.customerId} />

    //     </div>

    // );
}