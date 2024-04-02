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

    const displayNoneStyles = {
        display: "none",
    };

    const completedCarStyles ={
        width: '100%',
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
    const [CarCompleted, setCarCompleted] = useState(displayNoneStyles);

    const handleClickOne = () => {
        setSpanStyleOne(activeStyles);
        setButtonStyleOne(completedButtonStyles);

        setSpanStyleTwo(baseSpanStyles);
        setButtonStyleTwo(baseButtonStyles);
        setSpanStyleThree(baseSpanStyles);
        setButtonStyleThree(baseButtonStyles);
        setSpanStyleFour(baseSpanStyles);
        setButtonStyleFour(baseButtonStyles);
        setSpanStyleFive(baseSpanStyles);
        setButtonStyleFive(baseButtonStyles);
        setSpanStyleSix(baseSpanStyles);
        setButtonStyleSix(baseButtonStyles);
        setSpanStyleSeven(baseSpanStyles);
        setButtonStyleSeven(baseButtonStyles);
        setButtonStyleEight(baseButtonStyles);
        setSpanStyleEight(baseSpanStyles);

        setCarCompleted(displayNoneStyles);

    };
    const handleClickTwo = () => {
        setSpanStyleOne(completedSpanStyles);

        setSpanStyleTwo(activeStyles);

        setButtonStyleOne(completedButtonStyles);
        setButtonStyleTwo(completedButtonStyles);

        setSpanStyleThree(baseSpanStyles);
        setButtonStyleThree(baseButtonStyles);
        setSpanStyleFour(baseSpanStyles);
        setButtonStyleFour(baseButtonStyles);
        setSpanStyleFive(baseSpanStyles);
        setButtonStyleFive(baseButtonStyles);
        setSpanStyleSix(baseSpanStyles);
        setButtonStyleSix(baseButtonStyles);
        setSpanStyleSeven(baseSpanStyles);
        setButtonStyleSeven(baseButtonStyles);
        setButtonStyleEight(baseButtonStyles);
        setSpanStyleEight(baseSpanStyles);

        setCarCompleted(displayNoneStyles);
    };
    const handleClickThree = () => {
        setSpanStyleOne(completedSpanStyles);
        setSpanStyleTwo(completedSpanStyles);

        setSpanStyleThree(activeStyles);

        setButtonStyleOne(completedButtonStyles);
        setButtonStyleTwo(completedButtonStyles);
        setButtonStyleThree(completedButtonStyles);

        setSpanStyleFour(baseSpanStyles);
        setButtonStyleFour(baseButtonStyles);
        setSpanStyleFive(baseSpanStyles);
        setButtonStyleFive(baseButtonStyles);
        setSpanStyleSix(baseSpanStyles);
        setButtonStyleSix(baseButtonStyles);
        setSpanStyleSeven(baseSpanStyles);
        setButtonStyleSeven(baseButtonStyles);
        setButtonStyleEight(baseButtonStyles);
        setSpanStyleEight(baseSpanStyles);

        setCarCompleted(displayNoneStyles);
    };
    const handleClickFour = () => {
        setSpanStyleOne(completedSpanStyles);
        setSpanStyleTwo(completedSpanStyles);
        setSpanStyleThree(completedSpanStyles);

        setSpanStyleFour(activeStyles);


        setButtonStyleOne(completedButtonStyles);
        setButtonStyleTwo(completedButtonStyles);
        setButtonStyleThree(completedButtonStyles);
        setButtonStyleFour(completedButtonStyles);

        setSpanStyleFive(baseSpanStyles);
        setButtonStyleFive(baseButtonStyles);
        setSpanStyleSix(baseSpanStyles);
        setButtonStyleSix(baseButtonStyles);
        setSpanStyleSeven(baseSpanStyles);
        setButtonStyleSeven(baseButtonStyles);
        setButtonStyleEight(baseButtonStyles);
        setSpanStyleEight(baseSpanStyles);

        setCarCompleted(displayNoneStyles);
    };
    const handleClickFive = () => {
        setSpanStyleOne(completedSpanStyles);
        setSpanStyleTwo(completedSpanStyles);
        setSpanStyleThree(completedSpanStyles);
        setSpanStyleFour(completedSpanStyles);

        setSpanStyleFive(activeStyles);

        setButtonStyleOne(completedButtonStyles);
        setButtonStyleTwo(completedButtonStyles);
        setButtonStyleThree(completedButtonStyles);
        setButtonStyleFour(completedButtonStyles);
        setButtonStyleFive(completedButtonStyles);

        setSpanStyleSix(baseSpanStyles);
        setButtonStyleSix(baseButtonStyles);
        setSpanStyleSeven(baseSpanStyles);
        setButtonStyleSeven(baseButtonStyles);
        setButtonStyleEight(baseButtonStyles);
        setSpanStyleEight(baseSpanStyles);

        setCarCompleted(displayNoneStyles);
    };
    const handleClickSix = () => {
        setSpanStyleOne(completedSpanStyles);
        setSpanStyleTwo(completedSpanStyles);
        setSpanStyleThree(completedSpanStyles);
        setSpanStyleFour(completedSpanStyles);
        setSpanStyleFive(completedSpanStyles);

        setSpanStyleSix(activeStyles);

        setButtonStyleOne(completedButtonStyles);
        setButtonStyleTwo(completedButtonStyles);
        setButtonStyleThree(completedButtonStyles);
        setButtonStyleFour(completedButtonStyles);
        setButtonStyleFive(completedButtonStyles);
        setButtonStyleSix(completedButtonStyles);

        setButtonStyleSeven(baseButtonStyles);
        setSpanStyleSeven(baseSpanStyles);
        setButtonStyleEight(baseButtonStyles);
        setSpanStyleEight(baseSpanStyles);

        setCarCompleted(displayNoneStyles);
    };
    const handleClickSeven = () => {
        setSpanStyleOne(completedSpanStyles);
        setSpanStyleTwo(completedSpanStyles);
        setSpanStyleThree(completedSpanStyles);
        setSpanStyleFour(completedSpanStyles);
        setSpanStyleFive(completedSpanStyles);
        setSpanStyleSix(completedSpanStyles);

        setSpanStyleSeven(activeStyles);

        setButtonStyleOne(completedButtonStyles);
        setButtonStyleTwo(completedButtonStyles);
        setButtonStyleThree(completedButtonStyles);
        setButtonStyleFour(completedButtonStyles);
        setButtonStyleFive(completedButtonStyles);
        setButtonStyleSix(completedButtonStyles); 
        setButtonStyleSeven(completedButtonStyles);

        setSpanStyleEight(baseSpanStyles);
        setButtonStyleEight(baseButtonStyles);

        setCarCompleted(displayNoneStyles);
    };
    const handleClickEight = () => {
        setSpanStyleOne(completedSpanStyles);
        setSpanStyleTwo(completedSpanStyles);
        setSpanStyleThree(completedSpanStyles);
        setSpanStyleFour(completedSpanStyles);
        setSpanStyleFive(completedSpanStyles);
        setSpanStyleSix(completedSpanStyles);
        setSpanStyleSeven(completedSpanStyles);

        setSpanStyleEight(activeStyles);

        setButtonStyleOne(completedButtonStyles);
        setButtonStyleTwo(completedButtonStyles);
        setButtonStyleThree(completedButtonStyles);
        setButtonStyleFour(completedButtonStyles);
        setButtonStyleFive(completedButtonStyles);
        setButtonStyleSix(completedButtonStyles); 
        setButtonStyleSeven(completedButtonStyles);
        setButtonStyleEight(completedButtonStyles);

        setCarCompleted(displayNoneStyles);
    };
    const handleClickNine = () => {
        setSpanStyleOne(displayNoneStyles);
        setButtonStyleOne(displayNoneStyles);
        setSpanStyleTwo(displayNoneStyles);
        setButtonStyleTwo(displayNoneStyles);
        setSpanStyleThree(displayNoneStyles);
        setButtonStyleThree(displayNoneStyles);
        setSpanStyleFour(displayNoneStyles);
        setButtonStyleFour(displayNoneStyles);
        setSpanStyleFive(displayNoneStyles);
        setButtonStyleFive(displayNoneStyles);
        setSpanStyleSix(displayNoneStyles);
        setButtonStyleSix(displayNoneStyles);
        setSpanStyleSeven(displayNoneStyles);
        setButtonStyleSeven(displayNoneStyles);
        setSpanStyleEight(displayNoneStyles);
        setButtonStyleEight(displayNoneStyles);
        setCarCompleted(completedCarStyles);
    };

	return (
        <>	
            
            <div className="container-fluid">
                <button type="button" class="btn btn-warning btn-lg btn-block"style={ CarCompleted }>Your car is Completed! </button>
                <div className="row">
                    <div className="col-md-12">
                        
                        <div className="container-fluid p-2 align-items-center">
                            <div className="d-flex justify-content-around">
                                <button
                                    className="btn text-white btn-sm rounded-pill"
                                    style={ buttonStyleOne }
                                    id="1"
                                   
                                >
                                1
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
