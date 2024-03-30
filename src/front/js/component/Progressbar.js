import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Progressbar = () => {
	const {store, actions} =useContext(Context);
	return (
        <>	
            <div className="form-check form-switch mx-4">
                <input
                    className="form-check-input p-2"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    checked
                    onClick="myFunction()"
                />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container-fluid p-2 align-items-center">
                            <div className="d-flex justify-content-around">
                                <button
                                    className="btn bg-success text-white btn-sm rounded-pill"
                                    style={{ width: '2rem', height: '2rem' }}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company1"
                                    aria-expanded="true"
                                    aria-controls="company1"
                                    onClick="stepFunction(event)"
                                >
                                1
                                </button>
                                <span
                                    className="bg-dark w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={{
                                        width: '2rem',
                                        height: '2rem',
                                        background: 'linear-gradient(to right, green, green, green, black)',
                                        color: 'white',
                                        border: 'none', // Remove border for a cleaner look
                                        cursor: 'pointer', // Change cursor to pointer on hover
                                        boxShadow: '0 0 25px yellow', // Add yellow shadow
                                    }}
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={{ width: '2rem', height: '2rem' }}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company1"
                                    aria-expanded="true"
                                    aria-controls="company1"
                                    onClick="stepFunction(event)"
                                >
                                2
                                </button>
                                <span
                                    className="bg-dark w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style={{ height: '2.0rem' }}
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={{ width: '2rem', height: '2rem' }}
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
                                    style={{ height: '2.0rem' }}
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={{ width: '2rem', height: '2rem' }}
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
                                    style={{ height: '2.0rem' }}
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={{ width: '2rem', height: '2rem' }}
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
                                    style={{ height: '2.0rem' }}
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={{ width: '2rem', height: '2rem' }}
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
                                    style={{ height: '2.0rem' }}
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={{ width: '2rem', height: '2rem' }}
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
                                    style={{ height: '2.0rem' }}
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={{ width: '2rem', height: '2rem' }}
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
                                    style={{ height: '2.0rem' }}
                                >
                                </span>
                                <button
                                    className="btn bg-dark text-white btn-sm rounded-pill"
                                    style={{ width: '2rem', height: '2rem' }}
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
            <div>
                <h1>1: Car Accepted</h1>
                <h1>2: Payment or Insurance accepted</h1>
                <h1>3: Payment or Insurance check recieved</h1>
                <h1>4: Parts Ordered</h1>
                <h1>5: Parts Delivered</h1>
                <h1>6: Labor Begin Date</h1>
                <h1>7: Car Repair Complete</h1>
                <h1>8: Car Being Prepared For Pickup</h1>
                <h1>9: Car Ready For Pickup</h1>



            </div>
	    </>
	);
};
