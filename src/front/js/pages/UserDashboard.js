import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import NewWorkOrder from "../component/NewWorkOrder";
import OrderHistory from "../component/OrderHistory";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    // useEffect(() => {
    //     if (!store.token) {
    //         navigate("/user-log-in");
    //     }
    // }, [store.token, navigate]);



    useEffect(() => {
        if (!store.token) {
            setOrders([]);
        }
    }, [store.token]);

    useEffect(() => {
        if (store.token) {
            actions.getAllWorkOrders().then(data => {
                setOrders(data);
            }).catch(error => {
                console.error("Error fetching orders", error)
            });
        }
    }, [store.token, actions])


    useEffect(() => {
        actions.checkIfTokenInSessionStorage();
        if(!store.token) {
            navigate("/user-log-in");
        }
    }, [store.token])


    return (
        <div>
            <h1>Welcome to the Business Owner Home Page!</h1>
            <div>
                <h4 style={{ textAlign: 'center', marginTop: '10px' }}>Create New Work Order</h4>
                <NewWorkOrder />
            </div>
            <div>
                <OrderHistory orders={orders} />
            </div>
        </div>
    );
}

export default UserDashboard;