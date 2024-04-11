import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { PictureSlider } from "../component/PictureSlider";

export const UserCustomerDetails = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: ""
      })
      const [makeList, setMakeList] = useState([]);
      const [modelsList, setModelsList] = useState([]);
      const [make, setMake] = useState("");
      const [model, setModel] = useState("");
      const [year, setYear] = useState("");
      const [vin, setVin] = useState("");
      const [License, setLicense] = useState("");
      const [color, setColor] = useState("");
    
      const [uploadedImages, setUploadedImages] = useState([]);
      const [woStages, setWoStages] = useState([]);
      const [comments, setComments] = useState([]);

    // useEffect(() => {
    //     if (!store.token) {
    //         navigate("/user-log-in");
    //     }
    // }, [store.token, navigate]);
    let first_name = "Michael Mirisciotta"



    return (
        <div className="d-flex bg-black flex-column w-100 align-items-center text-center" >
            <div className="container-flex ">
                <h1 className="pt-2 text-light">{first_name}</h1>
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
                                <div className="div align-items-center fs-4 mx-auto shadow">
                                    <div  className="div border" style={{
                                        background: '#fff',
                                        boxShadow: '0 1px 1px rgba(0,0,0,0.15), 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0,0,0,0.15), 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0,0,0,0.15)',
                                        padding: '0px'}}  >
                                        <p> Item leftsssssssssssssssssssssssss</p>
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