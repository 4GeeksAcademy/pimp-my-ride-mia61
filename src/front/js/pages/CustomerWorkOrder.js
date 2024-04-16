import React, { useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CustomerWorkOrder = () => {
    const { workOrderId } = useParams();
    const { store, actions } = useContext(Context);
    const[selectedOrder, setSelectedOrder] = useState(null)
    const[workOrders, setWorkOrders] = useState([])

    useEffect(() => {
        fetch(process.env.BACKEND_URL + "/api/work_orders/customer", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
        }).then(
            response => response.json()
        ).then(
            result => setWorkOrders(result)
        )
        
    }, [] )
    
    useEffect(() => setSelectedOrder(workOrders.find((order) => order.id === parseInt(workOrderId))), [workOrders])

    
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












// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";

// export const CustomerWorkOrder = () => {
//     const { store, actions } = useContext(Context);
//     const navigate = useNavigate();
//     const [workOrders, setWorkOrders] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         if (!store.token) {
//             navigate("/customer-log-in");
//         } else if (!store.customerId) {
//             console.error("Customer ID is missing");
//             setError("Customer ID is missing");
//         } else {
//             setLoading(true);
//             actions.getCustomerWorkOrders(store.customerId)
//                 .then(data => {
//                     setLoading(false);
//                     if (data && data.length) {
//                         setWorkOrders(data);
//                     } else {
//                         setError("No work orders found.");
//                     }
//                 })
//                 .catch(error => {
//                     setLoading(false);
//                     console.error("Error fetching work orders:", error);
//                     setError("Error fetching work orders: " + error.message);
//                 });
//         }
//     }, [store.token, store.customerId, actions, navigate]);

//     const handleWorkOrderClick = (workOrderId) => {
//         navigate(`/customer-work-order/${workOrderId}`);
//     };

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : workOrders.map((order) => (
//                 <ul key={order.id}>
//                     <li onClick={() => handleWorkOrderClick(order.id)}>
//                         {order.description} - Status: {order.status}
//                     </li>
//                 </ul>
//             ))}
//         </div>
//     );
// };

