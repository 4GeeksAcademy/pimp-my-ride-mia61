import React from 'react';
import NewWorkOrder from "../component/NewWorkOrder";
import OrderHistory from "../component/OrderHistory";
// import { useNavigate } from "react-router-dom";

const BusinessOwnerHomePage = () => {
    return (
        <div>
            <h1>Welcome to the Business Owner Home Page</h1>
            <div>
                <h2>Create New Work Order</h2>
                <NewWorkOrder />
            </div>
            <div>
                <h2>Order History</h2>
                <OrderHistory />
            </div>
        </div>
    );
}

export default BusinessOwnerHomePage;