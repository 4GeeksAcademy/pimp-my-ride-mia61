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
                    onclick="myFunction()"
                />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container-fluid p-2 align-items-center">
                            <div className="d-flex justify-content-around">
                                <button
                                    className="btn bg-success text-white btn-sm rounded-pill"
                                    style="width: 2rem; height: 2rem"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company1"
                                    aria-expanded="true"
                                    aria-controls="company1"
                                    onclick="stepFunction(event)"
                                >
                                1
                                </button>
                                <span
                                    className="bg-success w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style="height: 0.2rem"
                                >
                                </span>
                                <button
                                    className="btn bg-success text-white btn-sm rounded-pill"
                                    style="width: 2rem; height: 2rem"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company2"
                                    aria-expanded="false"
                                    aria-controls="company3"
                                    onclick="stepFunction(event)"
                                >
                                    2
                                </button>
                                <span
                                    className="bg-success w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style="height: 0.2rem"
                                >
                                </span>
                                <button
                                    className="btn bg-success text-white btn-sm rounded-pill"
                                    style="width: 2rem; height: 2rem"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company3"
                                    aria-expanded="false"
                                    aria-controls="company3"
                                    onclick="stepFunction(event)"
                                >
                                    3
                                </button>
                                <span
                                    className="bg-success w-25 rounded mt-auto mb-auto me-1 ms-1"
                                    style="height: 0.2rem"
                                >
                                </span>
                                <button
                                    className="btn bg-success text-white btn-sm rounded-pill"
                                    style="width: 2rem; height: 2rem"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#company4"
                                    aria-expanded="false"
                                    aria-controls="company4"
                                    onclick="stepFunction(event)"
                                >
                                    4
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	    </>
	);
};
