import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { WorkOrderComments } from "../component/WorkOrderComments";
import '../../styles/WorkOrderDetails.css';
import '../../styles/NewWorkOrder.css'


export const WorkOrderDetails = () => {
    const { store, actions } = useContext(Context);
    const [workOrder, setWorkOrder] = useState({
        make: "",
        model: "",
        year: "",
        vin: "",
        license_plate: "",
        color: "",
        time_created: "",
        images: [],
        wo_stages: []
    })
    const [pictures, setPictures] = useState([])
    const [customer, setCustomer] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        email: "",
    })

    const navigate = useNavigate();
    const params = useParams();
    const [editMode, setEditMode] = useState(false);

    let fetchData = async () => {
        let resp = await fetch(process.env.BACKEND_URL + "/api/work-order/" + params.theid, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + store.token
            }
        })
        let data = await resp.json()
        if (data) {
            setWorkOrder(data.work_order)
            for (let i = 0; i < data.work_order.wo_stages.length; i++) {
                if (data.work_order.wo_stages[i] == data.work_order.current_stage) {
                    setActiveStep(i + 1)
                }
            }

            setPictures(data.work_order.images)
            let response = await actions.getCustomerById(data.work_order.customer_id)
            setCustomer(response)
        };
    }

    useEffect(() => {
        if (!store.token) return
        fetchData();
    }, [store.token])

    const [activeStep, setActiveStep] = useState(1);
    const lengthOfWorkOrderWoStages = workOrder.wo_stages.length;
    const handleClick = (step) => {
        setActiveStep(step);
        setWorkOrder({ ...workOrder, current_stage: workOrder.wo_stages[step - 1] })
    };

    const handleEdit = () => setEditMode(true);
    const handleSave = async () => {
        if (!workOrder.est_completion) {
            alert("Estimated completion date is required.");
            return;
        }

        const formattedDate = new Date(workOrder.est_completion).toISOString().split('T')[0];
        const updatedWorkOrder = {
            ...workOrder,
            est_completion: formattedDate
        };

        try {
            const response = await actions.editWorkOrder(updatedWorkOrder);
            if (response) {
                alert("Work order updated successfully.");
                setEditMode(false);
                fetchData();
            } else {
                alert("Failed to update the work order.");
            }
        } catch (error) {
            console.error('Error saving work order:', error);
            alert("Error saving work order.");
        }
    };
    const handleInputChange = (e) => {
        if (!e.target) {
            console.error("Event target is null", e);
            return;
        }
        const { name, value } = e.target;
        setWorkOrder(prev => ({ ...prev, [name]: value }));
    }

    const handleInputChangeCustomer = (e) => {
        const { name, value } = e.target;
        setCustomer(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveCustomerDetails = async () => {
        const response = await actions.editCustomer(customer);
        if (response) {
            alert("Customer details updated successfully");
            fetchData();
        } else {
            alert("Failed to update customer details");
        }
    }

    const handleDeleteWorkOrder = async () => {
        if (window.confirm("Are you sure you want to delete this work order?")) {
            const deleted = await actions.deleteWorkOrder(params.theid);
            if (deleted) {
                navigate("/user-dashboard");
            } else {
                console.error("Failed to delete work order");
            }
        }
    };


    function formatTime(time) { return `${time.getMonth()}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()} ${parseInt(time.getHours()) < 12 ? "AM" : "PM"}` }
    function formatTimeNoHours(time) {
        const oneDayMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
        const nextDay = new Date(time.getTime() + oneDayMilliseconds); // Add one day to the provided time
        return `${nextDay.getMonth() + 1}/${nextDay.getDate()}/${nextDay.getFullYear()}`;
    }

    return (
        <div className="d-flex bg-dark flex-column align-items-center text-center">
            <div className="container-flex" style={{ width: "100%" }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '10px',
                    minHeight: '50vh'
                }}>
                    <div style={{ width: "100%", overflowX: "auto" }}>
                        {pictures.map((image, index) => (
                            <img
                                key={image.id}
                                src={image.image_url}
                                alt="Random"
                                style={{
                                    maxHeight: "500px",
                                    width: "auto",
                                    objectFit: "cover",
                                    margin: "0 5px"
                                }}
                            />
                        ))}
                    </div>
                    <div style={{ width: "100%", background: "#f8f9fa", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center', margin: "20px 0" }}>
                                    {[...Array(lengthOfWorkOrderWoStages).keys()].map((index) => (
                                        <React.Fragment key={index}>
                                            <div style={{ textAlign: 'center' }}>
                                                <button
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
                                                    onClick={() => handleClick(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                                <p style={{ margin: "4px 0", color: 'gray', fontSize: '14px' }}>{workOrder.wo_stages[index]}</p>
                                            </div>
                                            {index < lengthOfWorkOrderWoStages - 1 && (
                                                <div style={{ width: "50px", height: "2px", background: index + 1 < activeStep ? "#28a745" : "#ccc", margin: "0 10px" }}></div>
                                            )}
                                            {activeStep === index + 1 && (
                                                <div className="stepDescription text-center" style={{ margin: "10px 0" }}>
                                                    <img src="https://res.cloudinary.com/dufs8hbca/image/upload/v1713900729/progress_bar_car_qa6han.png" alt="Progress Stage" style={{ height: "50px" }} />
                                                    <p>{workOrder.wo_stages[index]}</p>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                              

                                </div>
                            </div>
                        </div>
                        <h2 style={{ backgroundColor: "#343a40", color: "white", padding: "10px 0" }}>Current Stage: {workOrder.wo_stages[activeStep - 1]}</h2>
                        <button className="btn-large pt-2 bg-dark text-light" onClick={() => actions.editWorkOrder(workOrder)}> Add Steps to the progressbar </button>
                    </div>
                    <div className="container-flex mx-auto d-flex  justify-content-between" style={{ width: "100%", marginTop: "20px" }}>
                        <div className="container" style={{ width: "45%", background: '#fff', padding: "20px", boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                            {/* Editing for customer */}
                            <div className="mb-3">
                                <label className="form-label">First Name: </label>
                                <input className="form-control" name="first_name" value={customer.first_name} onChange={handleInputChangeCustomer} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Last Name: </label>
                                <input className="form-control" name="last_name" value={customer.last_name} onChange={handleInputChangeCustomer} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email: </label>
                                <input className="form-control" name="email" value={customer.email} onChange={handleInputChangeCustomer} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number: </label>
                                <input className="form-control" name="phone" value={customer.phone} onChange={handleInputChangeCustomer} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address: </label>
                                <input className="form-control" name="address" value={customer.address} onChange={handleInputChangeCustomer} />
                            </div>
                            <button className="btn btn-primary" onClick={handleSaveCustomerDetails}>Save Customer Details</button>


                            <div className="container-flex mx-auto border d-flex flex-column" style={{ padding: "20px", boxShadow: '0 1px 1px rgba(0,0,0,0.15), 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0,0,0,0.15), 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0,0,0,0.15)' }}>
                                <div className="align-items-center fs-4 mx-auto" style={{ textShadow: '0px 10px 10px #234D3C' }}>
                                    {editMode ? (
                                        <>
                                            {/* Editable fields */}
                                            <div className="mb-3">
                                                <label className="form-label">Make: </label>
                                                <input className="form-control" name="make" value={workOrder.make} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Model: </label>
                                                <input className="form-control" name="model" value={workOrder.model} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Year: </label>
                                                <input className="form-control" name="year" value={workOrder.year} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">VIN: </label>
                                                <input className="form-control" name="vin" value={workOrder.vin} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">License Plate: </label>
                                                <input className="form-control" name="license_plate" value={workOrder.license_plate} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Color: </label>
                                                <input className="form-control" name="color" value={workOrder.color} onChange={handleInputChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Date Created: </label>
                                                <input className="form-control" disabled value={formatTime(new Date(workOrder.time_created))} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Estimated Completion Date: </label>
                                                <input className="form-control" disabled value={formatTimeNoHours(new Date(workOrder.est_completion))} />
                                            </div>
                                            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                                        </>
                                    ) : (
                                        <>
                                            {/* Display fields */}
                                            <p>Make: {workOrder.make}</p>
                                            <p>Model: {workOrder.model}</p>
                                            <p>Year: {workOrder.year}</p>
                                            <p>VIN: {workOrder.vin}</p>
                                            <p>License Plate: {workOrder.license_plate}</p>
                                            <p>Color: {workOrder.color}</p>
                                            <p>Date Created: {formatTime(new Date(workOrder.time_created))}</p>
                                            <p>Estimated Completion Date: {formatTimeNoHours(new Date(workOrder.est_completion))}</p>
                                            <button className="btn btn-secondary" onClick={handleEdit}>Edit Details</button>
                                        </>
                                    )}

                            <div className="container-flex mx-auto border d-felx flex-column">
                                <div className="div align-items-center fs-4 mx-auto p-5" style={{ textShadow: '0px 10px 10px #234D3C' }}>
                                    <div className="div border p-5" style={{
                                        background: '#fff',
                                        boxShadow: '0 1px 1px rgba(0,0,0,0.15), 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0,0,0,0.15), 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0,0,0,0.15)',
                                        padding: '0px'
                                    }}  >
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Make: </label> <input onChange={(e) => setWorkOrder({ ...workOrder, make: e.target.value })} value={workOrder.make} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Model: </label><input onChange={(e) => setWorkOrder({ ...workOrder, model: e.target.value })} value={workOrder.model} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Year: </label><input onChange={(e) => setWorkOrder({ ...workOrder, year: e.target.value })} value={workOrder.year} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">VIN: </label><input onChange={(e) => setWorkOrder({ ...workOrder, vin: e.target.value })} value={workOrder.vin} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">License: </label><input onChange={(e) => setWorkOrder({ ...workOrder, license_plate: e.target.value })} value={workOrder.license_plate} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Color: </label><input onChange={(e) => setWorkOrder({ ...workOrder, color: e.target.value })} value={workOrder.color} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Date Created: </label><input disabled value={formatTimeNoHours(new Date(workOrder.time_created))} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Estimated Completion Date: </label><input disabled value={formatTimeNoHours(new Date(workOrder.est_completion))} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Edit Estimated Completion Date: </label>
                                            {/* Show stored date in an editable input */}
                                            <input
                                                className="form-control"
                                                name="est_completion"
                                                type="date"
                                                onChange={(event) => setWorkOrder({ ...workOrder, est_completion: event.target.value })}
                                                value={workOrder.est_completion}
                                            />
                                        </div>


                                        <button className="btn-large pt-2 bg-dark text-light" onClick={() => actions.editWorkOrder(workOrder)} > Edit Work Order Button </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-flex mx-auto noteBook bg-white flex-column">
                            <div className="div align-items-center fs-4 mx-auto p-5" style={{ textShadow: '0px 10px 10px #234D3C' }}>
                                <div className="div border p-5" style={{
                                    background: '#fff',
                                    boxShadow: '0 1px 1px rgba(0,0,0,0.15), 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0,0,0,0.15), 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0,0,0,0.15)',
                                    padding: '0px'
                                }}  >
                                    <WorkOrderComments
                                        formatTime={formatTime}
                                        refreshWorkOrder={fetchData}
                                        comments={workOrder.comments}
                                        creationDate={workOrder.time_created}
                                        woId={workOrder.id} />

                                </div>
                            </div>

                          
                        </div>
                    </div>
                    <div style={{ width: "100%", textAlign: "center", padding: "20px" }}>
                        <button className="btn btn-danger" onClick={handleDeleteWorkOrder}>
                            Warning! Delete Work Order... Warning!
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};