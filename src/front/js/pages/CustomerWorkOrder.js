import React, { useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CustomerWorkOrder = () => {
    const { workOrderId } = useParams();
    const { store, actions } = useContext(Context);
    const[selectedOrder, setSelectedOrder] = useState(null)
    const[workOrders, setWorkOrders] = useState([])

    useEffect(() => {
        if (!store.token) return;
    
        fetch(process.env.BACKEND_URL + "/api/work_orders/customer", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + store.token
            },
        }).then(
            response => response.json()
        // ).then(
        //     result => setWorkOrders(result)
        ).then(
            result => {
                console.log(result);
                setWorkOrders(result);
            }
        );
        
    }, [store] )
    
    // useEffect(() => setSelectedOrder(workOrders.find((order) => order.id === parseInt(workOrderId))), [workOrders])
    useEffect(() => {
        if (workOrders && workOrders.length > 0) {
            const selectedOrder = workOrders.find(order => order.id === parseInt(workOrderId));
            setSelectedOrder(selectedOrder);
        }
    }, [workOrders, workOrderId]);

    
    console.log (workOrders)

    return (
        <div>
            <div>
                PROGRESSBAR
            </div>
            <div>
                {selectedOrder && (
                <div>
                    <h2>Customer Work Order Details</h2>
                    <p>Make/Model: {selectedOrder.make} {selectedOrder.model}</p>
                    <p>Color: {selectedOrder.color}</p>
                    <p>VIN: {selectedOrder.vin}</p>
                    <p>License Plate: {selectedOrder.license_plate}</p>
                    <p>Status: {selectedOrder.current_stage}</p>
                </div>
            )}</div>
            
        </div>
    );
};








