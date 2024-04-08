import React, {useState} from 'react';
import NewWorkOrder from "../component/NewWorkOrder";
import OrderHistory from "../component/OrderHistory";
// import { useNavigate } from "react-router-dom";

const UserDashboard = () => {

    const [orders, setOrders] = useState([]);
    return (
        <div>
            <h1>Welcome to the Business Owner Home Page</h1>
            <div>
                <h2>Create New Work Order</h2>
                <NewWorkOrder />
            </div>
            <div>
                {/* <h2>Order History</h2> */}
                <OrderHistory orders={orders} />
            </div>
        </div>
    );
}

export default UserDashboard;