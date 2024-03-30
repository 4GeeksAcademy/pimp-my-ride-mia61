import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Progressbar = () => {
	const {store, actions} =useContext(Context);
    const [spanStyleOne, setSpanStyleOne] = useState(baseSpanStyles);

    const activeStyles = {
        width: '2rem',
        height: '2rem',
        background: 'linear-gradient(to right, green, green, green, black)',
        color: 'white',
        border: 'none', // Remove border for a cleaner look
        cursor: 'pointer', // Change cursor to pointer on hover
        boxShadow: '0 0 25px yellow', // Add yellow shadow
    };
    
    const baseButtonStyles = { 
        width: '2rem', 
        height: '2rem',
    };

    const baseSpanStyles = {
        height: '2.0rem',
        background: 'black', // Add black background
    };

    const handleClick = () => {
        setSpanStyleOne(activeStyles);
    };

	return (
        <>	
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container-fluid p-2 align-items-center">
                            <div className="d-flex justify-content-around">
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={ baseButtonStyles }
                                    id="1"
                                   
                                >
                                2
                                </button>
                                <span
                                    className="w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ spanStyleOne }
                                    id="11"
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={ baseButtonStyles }
                                    id="2"
                                   
                                >
                                2
                                </button>
                                <span
                                    className="bg-dark w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ baseSpanStyles }
                                    id="22"
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={ baseButtonStyles }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company2"
                                    aria-expanded="false"
                                    aria-controls="company3"
                                    onClick="stepFunction(event)"
                                >
                                3
                                </button>
                                <span
                                    className="bg-dark w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ baseSpanStyles }
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={ baseButtonStyles }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company3"
                                    aria-expanded="false"
                                    aria-controls="company3"
                                    onClick="stepFunction(event)"
                                >
                                4
                                </button>
                                <span
                                    className="bg-dark w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ baseSpanStyles }
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={ baseButtonStyles }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company4"
                                    aria-expanded="false"
                                    aria-controls="company4"
                                    onClick="stepFunction(event)"
                                >
                                    5
                                </button>
                                <span
                                    className="bg-dark w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ baseSpanStyles }
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={ baseButtonStyles }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company4"
                                    aria-expanded="false"
                                    aria-controls="company4"
                                    onClick="stepFunction(event)"
                                >
                                    6
                                </button>
                                <span
                                    className="bg-dark w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ baseSpanStyles }
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={ baseButtonStyles }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company4"
                                    aria-expanded="false"
                                    aria-controls="company4"
                                    onClick="stepFunction(event)"
                                >
                                    7
                                </button>
                                <span
                                    className="bg-dark w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ baseSpanStyles }
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={ baseButtonStyles }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company4"
                                    aria-expanded="false"
                                    aria-controls="company4"
                                    onClick="stepFunction(event)"
                                >
                                    8
                                </button>
                                <span
                                    className="bg-dark w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ baseSpanStyles }
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={ baseButtonStyles }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company4"
                                    aria-expanded="false"
                                    aria-controls="company4"
                                    onClick="stepFunction(event)"
                                >
                                    9
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        id="setter1"
                        onClick={() => handleClick("setter1")}
                    >
                        Hello
                    </button>
                </div>
                <div className="col">
                    <div>
                        <h1>1: Car Accepted</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button className="btn btn-primary">Hello</button>
                </div>
                <div className="col">
                    <div>
                        <h1>2: Payment or Insurance accepted</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button className="btn btn-primary">Hello</button>
                </div>
                <div className="col">
                    <div>
                        <h1>3: Payment or Insurance check recieved</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button className="btn btn-primary">Hello</button>
                </div>
                <div className="col">
                    <div>
                        <h1>4: Parts Ordered</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button className="btn btn-primary">Hello</button>
                </div>
                <div className="col">
                    <div>
                        <h1>5: Parts Delivered</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button className="btn btn-primary">Hello</button>
                </div>
                <div className="col">
                    <div>
                        <h1>6: Labor Begin Date</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button className="btn btn-primary">Hello</button>
                </div>
                <div className="col">
                    <div>
                        <h1>7: Car Repair Complete</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button className="btn btn-primary">Hello</button>
                </div>
                <div className="col">
                    <div>
                        <h1>8: Car Being Prepared For Pickup</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button className="btn btn-primary">Hello</button>
                </div>
                <div className="col">
                    <div>
                        <h1>9: Car Ready For Pickup</h1>
                    </div>
                </div>
            </div>
	    </>
	);
};
