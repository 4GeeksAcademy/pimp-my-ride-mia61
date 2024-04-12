import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const CustomerWorkOrder = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [workOrders, setWorkOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!store.token) {
            navigate("/customer-log-in");
        } else if (!store.customerId) {
            console.error("Customer ID is missing");
            setError("Customer ID is missing");
        } else {
            setLoading(true);
            actions.getCustomerWorkOrders(store.customerId)
                .then(data => {
                    setLoading(false);
                    if (data && data.length) {
                        setWorkOrders(data);
                    } else {
                        setError("No work orders found.");
                    }
                })
                .catch(error => {
                    setLoading(false);
                    console.error("Error fetching work orders:", error);
                    setError("Error fetching work orders: " + error.message);
                });
        }
    }, [store.token, store.customerId, actions, navigate]);

    const handleWorkOrderClick = (workOrderId) => {
        navigate(`/customer-work-order/${workOrderId}`);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : workOrders.map((order) => (
                <ul key={order.id}>
                    <li onClick={() => handleWorkOrderClick(order.id)}>
                        {order.description} - Status: {order.status}
                    </li>
                </ul>
            ))}
        </div>
    );
};
