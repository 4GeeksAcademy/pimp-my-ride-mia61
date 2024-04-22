import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { GenerateWoSteps } from "../component/GenerateWoSteps";
import { Link, useParams } from "react-router-dom";


export const WorkOrderDetails = () => {
    const { store, actions } = useContext(Context);
    const [workOrder, setWorkOrder] = useState({
        make: "",
        model: "",
        year: "",
        vin: "",
        license_plate: "",
        color: "",
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

    useEffect(() => {
        let fetchData = async () => {
            let resp = await fetch(process.env.BACKEND_URL + "/api/work-order/" + params.theid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("token")
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
                // if (response.status != 200 ) {
                //     alert("We had touble retriving your order details.")
                // } 
                // else {
                //     let info = await response.json()
                //     setCustomer(info) 

                // }
            };
        }
        fetchData();
    }, [])

    // PROGRESSBAR START
    const [activeStep, setActiveStep] = useState(1);
    const lengthOfWorkOrderWoStages = workOrder.wo_stages.length;
    const handleClick = (step) => {
        setActiveStep(step);
        setWorkOrder({ ...workOrder, current_stage: workOrder.wo_stages[step - 1] })
    };
    // PROGRESSBAR END
    // PROGRESSBAR EDIT
    const [editedSelectedSteps, setEditedSelectedSteps] = useState([]);
    // PROGRESSBAR EDIT






    //   const [uploadedImages, setUploadedImages] = useState([]);
    //   const [woStages, setWoStages] = useState([]);
    //   const [comments, setComments] = useState([]);

    // useEffect(() => {
    //     if (!store.token) {
    //         navigate("/user-log-in");
    //     }
    // }, [store.token, navigate]);

    return (
        <div className="d-flex bg-black flex-column align-items-center text-center" >
            <div className="container-flex">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', /* Center horizontally */
                    justifyContent: 'center', /* Center vertically */
                    paddingTop: '10px', /* Top padding */
                    minHeight: '50vh' /* Ensure container takes up full height of viewport */
                }}>
                    <React.Fragment>
                        <div style={{ width: "1200px", overflowY: "hidden" }}>
                            <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll" }}>
                                <div style={{ display: "flex" }}>
                                    {pictures.map((image, index) => {
                                        return <img
                                            key={image.id}
                                            src={image.image_url}
                                            alt="Random"
                                            style={{
                                                maxHeight: "500px",
                                                width: "auto",
                                                objectFit: "cover"
                                            }}
                                        />
                                    })}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    <div className="div bg-light m-5 p-5" style={{ width: "1200px" }}>

                    {/* #### PROGRESSBAR START #### */}

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="progressBarContainer">
                                        {[...Array(lengthOfWorkOrderWoStages).keys()].map((index) => (
                                            <React.Fragment key={index}>
                                                <button
                                                    className={`stepButton ${index + 1 <= activeStep ? "completed" : ""}`}
                                                    onClick={() => handleClick(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                                {index < 8 && (
                                                    <div
                                                        className={`stepConnector ${index + 1 < activeStep ? "completed" : ""}`}
                                                    ></div>
                                                )}
                                                {activeStep === index + 1 && (
                                                    <div className="stepDescription">
                                                        {workOrder.wo_stages[index]}
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div><h2 className="pt-2 bg-dark text-light">Current Stage: {workOrder.wo_stages[activeStep - 1]} </h2></div>
                        <button className="btn-large pt-2 bg-dark text-light" > Add Steps to the progressbar </button>
                        {/* <GenerateWoSteps className="d-none" setWoStages={} woStages={} /> */}

                        {/* #### PROGRESSBAR END #### */}
                    </div>

                    <div className="container-flex mx-auto d-flex justify-content-between">
                        <div className="container-flex mx-auto noteBook bg-white flex-column">
                            <div className="container-flex mx-auto border d-felx flex-column">
                                <div className="div align-items-center fs-4 mx-auto p-5" style={{ textShadow: '0px 10px 10px #234D3C' }}>
                                    <div className="div border p-5" style={{
                                        background: '#fff',
                                        boxShadow: '0 1px 1px rgba(0,0,0,0.15), 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0,0,0,0.15), 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0,0,0,0.15)',
                                        padding: '0px'
                                    }}  >

                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">First Name: </label><input onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })} value={customer.first_name} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Last name: </label><input onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })} value={customer.last_name} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Email: </label><input onChange={(e) => setCustomer({ ...customer, email: e.target.value })} value={customer.email} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Phone: </label><input onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} value={customer.phone} /></div>
                                        <div className="d-flex mb-1"><label className="pt-2 bg-dark text-light">Address: </label><input onChange={(e) => setCustomer({ ...customer, address: e.target.value })} value={customer.address} /></div>
                                        <button className="btn-large pt-2 bg-dark text-light" onClick={() => actions.editCustomer(customer)}> Edit Customer Button </button>

                                    </div>
                                    <div>
                                        <button className='mt-5' onClick="" >
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-flex mx-auto noteBook bg-white flex-column">
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
                                        <button className="btn-large pt-2 bg-dark text-light" onClick={() => actions.editWorkOrder(workOrder)} > Edit Work Order Button </button>
                                    </div>
                                    <div>
                                        <button className='mt-5' onClick="" >
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};