import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CustomerWorkOrder = () => {
    const { workOrderId } = useParams();
    const { store, actions } = useContext(Context);
    const [selectedOrder, setSelectedOrder] = useState()
    const [workOrders, setWorkOrders] = useState([])

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

    }, [store.token]);
    const [activeStep, setActiveStep] = useState(1);
    // useEffect(() => setSelectedOrder(workOrders.find((order) => order.id === parseInt(workOrderId))), [workOrders])
    useEffect(() => {
        if (workOrders && workOrders.length > 0) {
            const selectedOrder = workOrders.find(order => order.id === parseInt(workOrderId));
            setSelectedOrder(selectedOrder);
            console.log("selectedOrder, current_stage", selectedOrder, selectedOrder.current_stage)
            for (let i = 0; i < selectedOrder.wo_stages.length; i++) {
                if (selectedOrder.wo_stages[i] == selectedOrder.current_stage) {
                    setActiveStep(i + 1)
                }
            }
        }
    }, [workOrders, workOrderId]);



    console.log(workOrders)

    return (
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="progressBarContainer">
                                {selectedOrder && [...Array(selectedOrder.wo_stages.length).keys()].map((index) => (
                                    <React.Fragment key={index}>
                                        <button
                                            className={`stepButton ${index + 1 <= activeStep ? "completed" : ""}`}
                                        >
                                            {index + 1}
                                        </button>
                                        {index < 8 && (
                                            <div
                                                className={`stepConnector ${index + 1 < activeStep ? "completed" : ""}`}
                                            ></div>
                                        )}
                                        {activeStep === index + 1 && (
                                            <div className="stepDescription text-center">
                                            <img src="https://res.cloudinary.com/dufs8hbca/image/upload/v1713900729/progress_bar_car_qa6han.png" className="img-fluid" alt="..." style={{height: "50px" }} / >
                                            <p>{selectedOrder.wo_stages[index]}</p>
                                       </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                {selectedOrder && (<React.Fragment><div><h2 className="pt-2 bg-dark text-light">Current Stage: {selectedOrder.current_stage} </h2></div>
                    <div><h2 className="pt-2 bg-dark text-light">all Stages: {selectedOrder.wo_stages} </h2></div></React.Fragment>)}
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
                )}
            </div>
            <WorkOrderComments writeAccess = {false}/>
        </div>
    );
};








