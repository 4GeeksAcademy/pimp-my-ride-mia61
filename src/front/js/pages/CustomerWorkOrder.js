import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/CustomerWorkOrder.css';
import 'react-tooltip/dist/react-tooltip.css'  
import { Tooltip } from 'react-tooltip'


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
                                        <div style={{ textAlign: 'center' }}>
                                            <button
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content={activeStep != index + 1 ? selectedOrder.wo_stages[index]: ""}
                                                data-tooltip-place="top"
                                                style={{
                                                    background: index + 1 <= activeStep ? "#28a745" : "#6c757d",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "50%",
                                                    width: "40px",
                                                    height: "40px",
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            // onClick={() => handleClick(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                            <Tooltip id="my-tooltip" />
                                            {/* {activeStep != index + 1 ? (<p style={{ margin: "4px 0", color: 'gray', fontSize: '14px' }}>{selectedOrder.wo_stages[index]}</p>) : ""} */}
                                        </div>
                                        {index < selectedOrder.wo_stages.length - 1 && (
                                            <div style={{ width: "70px", height: "2px", background: index + 1 < activeStep ? "#28a745" : "#ccc", margin: "22px 10px" }}></div>
                                        )}
                                        {activeStep === index + 1 && (
                                            <div className="stepDescription text-center" style={{ margin: "10px 0" }}>
                                                <img src="https://res.cloudinary.com/dufs8hbca/image/upload/v1713900729/progress_bar_car_qa6han.png" alt="Progress Stage" style={{ height: "50px" }} />
                                                <p>{selectedOrder.wo_stages[index]}</p>
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
                        <h2>Work Order Details:</h2>
                        <p>Make/Model: {selectedOrder.make} {selectedOrder.model}</p>
                        <p>Color: {selectedOrder.color}</p>
                        <p>VIN: {selectedOrder.vin}</p>
                        <p>License Plate: {selectedOrder.license_plate}</p>
                        <p>Status: {selectedOrder.current_stage}</p>
                        <p>Estimated completion date: {formatTimeNoHours(new Date((selectedOrder.est_completion)))}</p>
                    </div>
                )}
            </div>
        </div >
    );
};








