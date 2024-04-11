import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { PictureSlider } from "../component/PictureSlider";
import { Progressbar } from "../component/Progressbar";

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
    //   const [makeList, setMakeList] = useState([]);
    //   const [modelsList, setModelsList] = useState([]);
    //   const [make, setMake] = useState("");
    //   const [model, setModel] = useState("");
    //   const [year, setYear] = useState("");
    //   const [vin, setVin] = useState("");
    //   const [License, setLicense] = useState("");
    //   const [color, setColor] = useState("");
    
      const [uploadedImages, setUploadedImages] = useState([]);
      const [woStages, setWoStages] = useState([]);
      const [comments, setComments] = useState([]);

    // useEffect(() => {
    //     if (!store.token) {
    //         navigate("/user-log-in");
    //     }
    // }, [store.token, navigate]);
    let full_name = "Michael Mirisciotta"
    let first_name = "Michael"
    let last_name = "Mirisciotta"
    let email = "MichaelMirisciotta@gmail.com"
    let phone = "5109999999"
    let address = "965 Notmy St. APT 102"
    let make = "Toyota"
    let model = "Tundra"
    let year = "2010"
    let vin = "12345678900987654321"
    let license = "ABC123"
    let color = "Pink"
    



    return (
        <div className="d-flex bg-black flex-column align-items-center text-center" >
            <div className="container-flex">
                <h1 className="pt-2 text-light">{full_name}</h1>
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
                                        <h2 className="pt-2 bg-dark text-light">First Name: {first_name}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Last name: {last_name}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Email: {email}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Phone: {phone}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Address: {address}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Make: {make}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Model: {model}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Year: {year}</h2>
                                        <h2 className="pt-2 bg-dark text-light">VIN: {vin}</h2>
                                        <h2 className="pt-2 bg-dark text-light">License: {license}</h2>
                                        <h2 className="pt-2 bg-dark text-light">Color: {color}</h2>
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