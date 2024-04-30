import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext";
import { CustomerWorkOrder } from "./CustomerWorkOrder";
import { BiSort } from "react-icons/bi";
import '../../styles/CustomerDashboard.css';
import { ValidateEmail, ValidateFirstName, ValidateLastName, ValidateAddress, ValidatePhone } from "../component/Validators";

export const CustomerDashboard = () => {

    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [invalidItems, setInvalidItems] = useState([]);
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

            actions.getCustomerWorkOrdersByCustomer()
            setCustomer(await actions.getCurrentCustomer())
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
        let isEmailValid = ValidateEmail(customer.email, setInvalidItems);
        let isFirstNameValid = ValidateFirstName(customer.first_name, setInvalidItems);
        let isLastNameValid = ValidateLastName(customer.last_name, setInvalidItems);
        let isAddressValid = ValidateAddress(customer.address, setInvalidItems);
        let isPhoneValid = ValidatePhone(customer.phone, setInvalidItems);
        if (isEmailValid && isFirstNameValid && isLastNameValid && isAddressValid && isPhoneValid) {
            let result = await actions.editCustomerbyCustomer(customer);
            if (result) {
                setEditMode(false);
            } else {
                alert("Failed to update user data");
            }
        }
    };

        const handleWorkOrderClick = (workOrderId) => {
            navigate(`/customer-work-order/${workOrderId}`);
        };

        return (
            <div className="dashboard-container pt-5">
                <h2 className="dashboard-title">Welcome to Customer Dashboard!</h2>
                {customer.id != null ? (
                    <div>
                        {editMode ?
                            (
                                <div className="dashboard-edit-mode">
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={customer.first_name}
                                        onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
                                    />
                                    {invalidItems.includes("first_name") && <label className="error-label">First Name is required</label>}
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={customer.last_name}
                                        onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
                                    />
                                    {invalidItems.includes("last_name") && <label className="error-label">Last Name is required</label>}
                                    <input
                                        type="text"
                                        name="email"
                                        value={customer.email}
                                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                    />
                                    {invalidItems.includes("email") && <label className="error-label">Invalid email format</label>}
                                    <input
                                        type="text"
                                        name="phone"
                                        value={customer.phone}
                                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                    />
                                    {invalidItems.includes("phone") && <label className="error-label">phone number is required</label>}
                                    <input
                                        type="text"
                                        name="address"
                                        value={customer.address}
                                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                    />
                                    {invalidItems.includes("address") && <label className="error-label">Address is required</label>}
                                    <button className="dashboard-edit-button" onClick={handleEditSubmit}>Save</button>
                                </div>
                            ) :
                            (
                                <div>
                                    <p><strong>Email:</strong> {customer.email}</p>
                                    <p><strong>First Name:</strong> {customer.first_name}</p>
                                    <p><strong>Last Name:</strong> {customer.last_name}</p>
                                    <p><strong>Phone:</strong> {customer.phone}</p>
                                    <p><strong>Address:</strong> {customer.address}</p>
                                    <button className="dashboard-edit-button" onClick={() => setEditMode(true)}>Edit</button>
                                </div>
                            )}
                        <div>
                            <h2 className="dashboard-title">Order History</h2>
                            <table className="dashboard-table">
                                <thead>
                                    <tr>

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
                                            <tr onClick={() => handleWorkOrderClick(order.id)}>

                                                <td>
                                                    {order.make} {order.model}
                                                </td>
                                                <td>{order.color}</td>
                                                <td>{order.vin}</td>
                                                <td>{order.license_plate}</td>
                                                <td>
                                                    {order.current_stage}
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
    }