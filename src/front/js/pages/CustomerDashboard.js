import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext";
import { CustomerWorkOrder } from "./CustomerWorkOrder";

export const CustomerDashboard = (props) => {

    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate("/customer-log-in");
        } else if (!store.customerId) {

            const savedCustomerId = sessionStorage.getItem("customerId");
            if (savedCustomerId) {
                actions.setCustomerId(savedCustomerId);
            } else {
                console.error("Customer ID is missing");
            }
        } else {
            actions.getCustomerById(store.customerId)
                .then(data => {
                    if (data) {
                        setEmail(data.email);
                        setfirst_name(data.first_name);
                        setlast_name(data.last_name);
                        setPhone(data.phone);
                        setAddress(data.address);
                    }
                })
                .catch(error => {
                    console.error("Failed to load customer data:", error);
                });
        }
    }, [store.token, store.customerId]);

    const handleUpdateCustProfile = async () => {
        const success = await actions.updateCustProfile({
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            address: address
        });
        if (success) {
            alert("Profile updated successfully!");
        } else {
            alert("Failed to update profile");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedCustData({ ...editedCustData, [name]: value });
    };

    const handleEditSubmit = () => {
        actions.updateUserData(editedCustData);
        setCustData({ ...editedCustData });
        setEditMode(false);
    };


    return (
        <div className="container pt-5">
            <h2>Welcome to Customer Dashboard</h2>
            {custData ? (
                <div>
                    {editMode ? (
                        <div>
                            <input
                                type="text"
                                name="first_name"
                                value={editedCustData.first_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="last_name"
                                value={editedCustData.last_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="email"
                                value={editedCustData.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editedCustData.phone}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="address"
                                value={editedCustData.address}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleEditSubmit}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Email:</strong> {custData.email}</p>
                            <p><strong>First Name:</strong> {custData.first_name}</p>
                            <p><strong>Last Name:</strong> {custData.last_name}</p>
                            <p><strong>Phone:</strong> {custData.phone}</p>
                            <p><strong>Address:</strong> {custData.address}</p>
                            <button onClick={() => setEditMode(true)}>Edit</button>
                        </div>
                    )}
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