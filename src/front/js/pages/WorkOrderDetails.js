import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { PictureSlider } from "../component/PictureSlider";
import { Progressbar } from "../component/Progressbar";
import { Link, useParams } from "react-router-dom";


export const WorkOrderDetails = () => {
    const { store, actions } = useContext(Context);
    const [ workOrder, setWorkOrder ] = useState({
        make: "",
        model: "",
        year: "",
        vin: "",
        license: "",
        color: "",
        images: [],
        wo_stages: []
    })

    const [ customer, setCustomer ] = useState({
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
            let resp = await fetch(process.env.BACKEND_URL+ "/api/work-order/" + params.theid,{
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                }
            })
            let data = await resp.json()
            if (data) {
                setWorkOrder(data.work_order)
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
    } ,[] )



    // const [customer, setCustomer] = useState({
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     phone: "",
    //     address: ""
    // })

    // const [ workOrder, setWorkOrder ] = useState({ 
    
    //  })
    
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
                {/* <h1 className="pt-2 text-light">{full_name}</h1> */}
                <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', /* Center horizontally */
                        justifyContent: 'center', /* Center vertically */
                        paddingTop: '10px', /* Top padding */
                        minHeight: '50vh' /* Ensure container takes up full height of viewport */
                    }}>    
                    <PictureSlider />
                <div className="div py-3">
                        
                </div>
                    <div className="container-flex mx-auto ">
                        <div className="container-flex mx-auto noteBook bg-white flex-column">
                            <div className="container-flex mx-auto border d-felx flex-column">
                                <div className="div align-items-center fs-4 mx-auto p-5" style={{ textShadow: '0px 10px 10px #234D3C' }}>
                                    <div  className="div border p-5" style={{
                                        background: '#fff',
                                        boxShadow: '0 1px 1px rgba(0,0,0,0.15), 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0,0,0,0.15), 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0,0,0,0.15)',
                                        padding: '0px'}}  >
                                        <Progressbar />

                                        {/* <h2 className="pt-2 bg-dark text-light">First Name: {customer.first_name}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Last name: {customer.last_name}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Email: {customer.email}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Phone: {customer.phone}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Address: {customer.address}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Make: {workOrder.make}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Model: {workOrder.model}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Year: {workOrder.year}</h2>
                                        <h2 className="pt-2 bg-dark text-light">VIN: {workOrder.vin}</h2>
                                        <h2 className="pt-2 bg-dark text-light">License: {workOrder.license}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Color: {workOrder.color}</h2> */}


                                        <h2 className="pt-2 bg-dark text-light">First Name: {customer.first_name}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Last name: {customer.last_name}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Email: {customer.email}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Phone: {customer.phone}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Address: {customer.address}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Make: {workOrder.make}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Model: {workOrder.model}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Year: {workOrder.year}</h2>
                                        <h2 className="pt-2 bg-dark text-light">VIN: {workOrder.vin}</h2>
                                        <h2 className="pt-2 bg-dark text-light">License: {workOrder.license}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Color: {workOrder.color}</h2>
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
        </div>
    );
};