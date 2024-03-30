import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Progressbar = () => {
	const {store, actions} =useContext(Context);
    
    

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
        background: 'black', // Add black background
    };

    const baseSpanStyles = {
        height: '2.0rem',
        background: 'black', // Add black background
    };

    const completedButtonStyles = { 
        width: '2rem', 
        height: '2rem',
        background: 'green',
    };

    const completedSpanStyles = { 
        width: '2rem', 
        height: '2rem',
        background: 'green',
    };

    const [spanStyleOne, setSpanStyleOne] = useState(baseSpanStyles);
    const [buttonStyleOne, setButtonStyleOne] = useState(baseButtonStyles);
    const [spanStyleTwo, setSpanStyleTwo] = useState(baseSpanStyles);
    const [buttonStyleTwo, setButtonStyleTwo] = useState(baseButtonStyles);
    const [spanStyleThree, setSpanStyleThree] = useState(baseSpanStyles);
    const [buttonStyleThree, setButtonStyleThree] = useState(baseButtonStyles);
    const [spanStyleFour, setSpanStyleFour] = useState(baseSpanStyles);
    const [buttonStyleFour, setButtonStyleFour] = useState(baseButtonStyles);
    const [spanStyleFive, setSpanStyleFive] = useState(baseSpanStyles);
    const [buttonStyleFive, setButtonStyleFive] = useState(baseButtonStyles);
    const [spanStyleSix, setSpanStyleSix] = useState(baseSpanStyles);
    const [buttonStyleSix, setButtonStyleSix] = useState(baseButtonStyles);
    const [spanStyleSeven, setSpanStyleSeven] = useState(baseSpanStyles);
    const [buttonStyleSeven, setButtonStyleSeven] = useState(baseButtonStyles);
    const [spanStyleEight, setSpanStyleEight] = useState(baseSpanStyles);
    const [buttonStyleEight, setButtonStyleEight] = useState(baseButtonStyles);

    const handleClickOne = () => {
        setSpanStyleOne(activeStyles);
        setButtonStyleOne(completedButtonStyles);
    };
    const handleClickTwo = () => {
        setSpanStyleTwo(activeStyles);
        setButtonStyleTwo(completedButtonStyles);
    };
    const handleClickThree = () => {
        setSpanStyleThree(activeStyles);
        setButtonStyleThree(completedButtonStyles);
    };
    const handleClickFour = () => {
        setSpanStyleFour(activeStyles);
        setButtonStyleFour(completedButtonStyles);
    };
    const handleClickFive = () => {
        setSpanStyleFive(activeStyles);
        setButtonStyleFive(completedButtonStyles);
    };
    const handleClickSix = () => {
        setSpanStyleSix(activeStyles);
        setButtonStyleSix(completedButtonStyles);
    };
    const handleClickSeven = () => {
        setSpanStyleSeven(activeStyles);
        setButtonStyleSeven(completedButtonStyles);
    };
    const handleClickEight = () => {
        setSpanStyleEight(activeStyles);
        setButtonStyleEight(completedButtonStyles);
    };
    const handleClickNine = () => {
        setSpanStyleNine(activeStyles);
        setButtonStyleNine(completedButtonStyles);
    };

	return (
        <>	
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container-fluid p-2 align-items-center">
                            <div className="d-flex justify-content-around">
                                <button
                                    className="btn text-white btn-sm rounded-pill"
                                    style={ buttonStyleOne }
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
                                    className="btn  text-white btn-sm rounded-pill"
                                    style={ buttonStyleTwo }
                                    id="2"
                                   
                                >
                                2
                                </button>
                                <span
                                    className=" w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ spanStyleTwo }
                                    id="22"
                                >
                                </span>
                                <button
                                    className="btn  text-white btn-sm rounded-pill"
                                    style={ buttonStyleThree }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company2"
                                    aria-expanded="false"
                                    aria-controls="company3"
                                    onClick="stepFunction(event)"
                                >
                                3
                                </button>
                                <span
                                    className=" w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ spanStyleThree }
                                >
                                </span>
                                <button
                                    className="btn  text-white btn-sm rounded-pill"
                                    style={ buttonStyleFour }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company3"
                                    aria-expanded="false"
                                    aria-controls="company3"
                                    onClick="stepFunction(event)"
                                >
                                4
                                </button>
                                <span
                                    className=" w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ spanStyleFour }
                                >
                                </span>
                                <button
                                    className="btn  text-white btn-sm rounded-pill"
                                    style={ buttonStyleFive }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company4"
                                    aria-expanded="false"
                                    aria-controls="company4"
                                    onClick="stepFunction(event)"
                                >
                                    5
                                </button>
                                <span
                                    className=" w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ spanStyleFive }
                                >
                                </span>
                                <button
                                    className="btn  text-white btn-sm rounded-pill"
                                    style={ buttonStyleSix }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company4"
                                    aria-expanded="false"
                                    aria-controls="company4"
                                    onClick="stepFunction(event)"
                                >
                                    6
                                </button>
                                <span
                                    className=" w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ spanStyleSix }
                                >
                                </span>
                                <button
                                    className="btn  text-white btn-sm rounded-pill"
                                    style={ buttonStyleSeven }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company4"
                                    aria-expanded="false"
                                    aria-controls="company4"
                                    onClick="stepFunction(event)"
                                >
                                    7
                                </button>
                                <span
                                    className=" w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ spanStyleSeven }
                                >
                                </span>
                                <button
                                    className="btn  text-white btn-sm rounded-pill"
                                    style={ buttonStyleEight }
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company4"
                                    aria-expanded="false"
                                    aria-controls="company4"
                                    onClick="stepFunction(event)"
                                >
                                    8
                                </button>
                                <span
                                    className=" w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={ spanStyleEight }
                                >
                                </span>
                                <button
                                    className="btn  text-white btn-sm rounded-pill"
                                    style={ buttonStyleEight }
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
                        onClick={() => handleClickOne()}
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
                    <button
                        className="btn btn-primary"
                        id="setter1"
                        onClick={() => handleClickTwo()}
                    >
                        Hello
                    </button>
                </div>
                <div className="col">
                    <div>
                        <h1>2: Payment or Insurance accepted</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        id="setter1"
                        onClick={() => handleClickThree()}
                    >
                        Hello
                    </button>
                </div>
                <div className="col">
                    <div>
                        <h1>3: Payment or Insurance check recieved</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        id="setter1"
                        onClick={() => handleClickFour()}
                    >
                        Hello
                    </button>
                </div>
                <div className="col">
                    <div>
                        <h1>4: Parts Ordered</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        id="setter1"
                        onClick={() => handleClickFive()}
                    >
                        Hello
                    </button>
                </div>
                <div className="col">
                    <div>
                        <h1>5: Parts Delivered</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        id="setter1"
                        onClick={() => handleClickSix()}
                    >
                        Hello
                    </button>
                </div>
                <div className="col">
                    <div>
                        <h1>6: Labor Begin Date</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        id="setter1"
                        onClick={() => handleClickSeven()}
                    >
                        Hello
                    </button>
                </div>
                <div className="col">
                    <div>
                        <h1>7: Car Repair Complete</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        id="setter1"
                        onClick={() => handleClickEight()}
                    >
                        Hello
                    </button>
                </div>
                <div className="col">
                    <div>
                        <h1>8: Car Being Prepared For Pickup</h1>
                    </div>
                </div>
            </div>
            <div className="row" >
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        id="setter1"
                        onClick={() => handleClickNine()}
                    >
                        Hello
                    </button>
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
