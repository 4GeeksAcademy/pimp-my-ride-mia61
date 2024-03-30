import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Progressbar = () => {
	const {store, actions} =useContext(Context);
	return (
	<>	
		<div class="form-check form-switch mx-4">
      		<input
				class="form-check-input p-2"
				type="checkbox"
				role="switch"
				id="flexSwitchCheckChecked"
				checked
				onclick="myFunction()"
    		/>
    	</div>
    		<div class="container-fluid">
      			<div class="row">
        			<div class="col-md-12">
          				<div class="container-fluid p-2 align-items-center">
            				<div class="d-flex justify-content-around">
              					<button
									class="btn bg-success text-white btn-sm rounded-pill"
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
									class="bg-success w-25 rounded mt-auto mb-auto me-1 ms-1"
									style="height: 0.2rem"
								>
								</span>
								<button
									class="btn bg-success text-white btn-sm rounded-pill"
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
									class="bg-success w-25 rounded mt-auto mb-auto me-1 ms-1"
									style="height: 0.2rem"
								>
								</span>
								<button
									class="btn bg-success text-white btn-sm rounded-pill"
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
									class="bg-success w-25 rounded mt-auto mb-auto me-1 ms-1"
									style="height: 0.2rem"
								>
								</span>
								<button
									class="btn bg-success text-white btn-sm rounded-pill"
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
          				<div class="collapse show" id="company1">
            				<div class="display-4">Company 1</div>
            					<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
									amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim
									veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
									ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor incididunt ut labore et
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo
									consequat.
            					</p>
								</div>
								<div class="collapse" id="company2">
									<div class="display-4">Company 2</div>
									<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
									amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim
									veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
									ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor incididunt ut labore et
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo
									consequat.
									</p>
								</div>
								<div class="collapse" id="company3">
									<div class="display-4">Company 3</div>
									<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
									amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim
									veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
									ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor incididunt ut labore et
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo
									consequat.
									</p>
								</div>
								<div class="collapse" id="company4">
									<div class="display-4">Company 4</div>
									<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
									amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim
									veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
									ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor incididunt ut labore et
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo
									consequat.
									</p>
								</div>
								</div>
							</div>
							</div>
							<div class="p-5 bg-primary-subtle text-white rounded" id="aboutMe">
							<h1>About Me</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
								veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
								commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
								velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
							</p>
							</div>
							<div class="p-5 rounded" id="experience">
							<h1 class="display-4">Experience</h1>
							<div class="d-lg-flex justify-content-around">
								<div class="card m-2">
								<div class="card-header text-center bg-body-secondary text-primary">
									<strong> Test</strong>
								</div>
								<div class="card-body">
									<p class="card-text lead">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat.
									</p>
								</div>
								</div>
								<div class="card m-2">
								<div class="card-header">test</div>
								<div class="card-body">
									<p class="card-text lead">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat.
									</p>
								</div>
								</div>
								<div class="card m-2">
								<div class="card-header">test</div>
								<div class="card-body">
									<p class="card-text lead">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat.
									</p>
								</div>
								</div>

								<div class="card m-2">
								<div class="card-header">test</div>
								<div class="card-body">
									<p class="card-text lead">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat.
									</p>
								</div>
								</div>
							</div>
							</div>
							<div class="p-5 bg-secondary text-white rounded" id="education">
							<h1>Education</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
								veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
								commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
								velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
							</p>
							</div>
							<div class="p-5 bg-dark-subtle text-white rounded" id="contactme">
							<h1>About Me</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
								veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
								commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
								velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
							</p>
							</div>
	</>
	);
};
