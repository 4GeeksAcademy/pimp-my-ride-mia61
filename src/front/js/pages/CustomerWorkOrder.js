import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/CustomerWorkOrder.css';

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

    function formatTime(time) { return `${time.getMonth()}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()} ${parseInt(time.getHours()) < 12 ? "AM" : "PM"}` }
    function formatTimeNoHours(time) {
        const oneDayMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
        const nextDay = new Date(time.getTime() + oneDayMilliseconds); // Add one day to the provided time
        return `${nextDay.getMonth() + 1}/${nextDay.getDate()}/${nextDay.getFullYear()}`;
    }



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
                                        <div>
                                            <button
                                                className={`stepButton ${index + 1 <= activeStep ? "completed" : ""}`}
                                            >
                                                {index + 1}
                                                {/* {selectedOrder.wo_stages[index]} */}
                                            </button>
                                            <p>{selectedOrder.wo_stages[index]}</p>
                                        </div>


                                        {index < 8 && (
                                            <div
                                                className={`stepConnector ${index + 1 < activeStep ? "completed" : ""}`}
                                            ></div>
                                        )}
                                        {activeStep === index + 1 && (
                                            <div className="stepDescription text-center">
                                                <img src="https://res.cloudinary.com/dufs8hbca/image/upload/v1713900729/progress_bar_car_qa6han.png" className="img-fluid" alt="..." style={{ height: "50px" }} />
                                                {/* <p>{selectedOrder.wo_stages[index]}</p> */}
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="selected-order-info">
                {selectedOrder && (
                    <div>
                        <h2>Customer Work Order Details</h2>
                        <p>Make/Model: {selectedOrder.make} {selectedOrder.model}</p>
                        <p>Color: {selectedOrder.color}</p>
                        <p>VIN: {selectedOrder.vin}</p>
                        <p>License Plate: {selectedOrder.license_plate}</p>
                        <p>Status: {selectedOrder.current_stage}</p>
                        <p>Car Ready date: {formatTimeNoHours(new Date((selectedOrder.est_completion)))}</p>
                    </div>
                )}
            </div>
        </div>
    );
};








