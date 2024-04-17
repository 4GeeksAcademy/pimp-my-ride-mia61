// import React, { useContext, useEffect } from "react";
// import {Context} from "../store/appContext";
// import { useNavigate } from "react-router-dom";

// export const CustomerProfile = (props) => {
//     const {store, actions} = useContext(Context);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if ( !store.token ) {
//             navigate("/customer-log-in");
//         }
//     }, [store.token, navigate]);
    
//     return (
//         <div className="d-flex flex-column w-100 align-items-center" >
//             <h2>Hello Profile</h2>
//             <button
//                 onClick={(event) => actions.fetchPrivateEndpoint()}>
//                 click me!
//             </button>
//             <p>{store.privateData}</p>
//         </div>
//     );
// };

// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../store/appContext";

// export const CustomerProfile = () => {
//     const { store, actions } = useContext(Context);
//     const [custData, setCustData] = useState(null); 
//     const [editMode, setEditMode] = useState(false);
//     const [editedCustData, setEditedCustData] = useState(null);
//     useEffect(() => {
//         if (store.customer) {
//             setCustData(store.customerId); 
//             setEditedCustData({ ...store.customerId });
//         }
//     }, [store.customerId]);

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setEditedCustData({ ...editedCustData, [name]: value });
//     };

//     const handleEditSubmit = () => {
//         actions.updateUserData(editedCustData);
//         setCustData({ ...editedCustData });
//         setEditMode(false);
//     };

//     return (
//         <div className="container pt-5">
//             <h2>Welcome to Customer Dashboard</h2>
//             {custData ? (
//                 <div>
//                     {editMode ? (
//                         <div>
//                             <input
//                                 type="text"
//                                 name="first_name"
//                                 value={editedCustData.first_name}
//                                 onChange={handleInputChange}
//                             />
//                             <input
//                                 type="text"
//                                 name="last_name"
//                                 value={editedCustData.last_name}
//                                 onChange={handleInputChange}
//                             />
//                             <input
//                                 type="text"
//                                 name="email"
//                                 value={editedCustData.email}
//                                 onChange={handleInputChange}
//                             />
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 value={editedCustData.phone}
//                                 onChange={handleInputChange}
//                             />
//                             <input
//                                 type="text"
//                                 name="address"
//                                 value={editedCustData.address}
//                                 onChange={handleInputChange}
//                             />
//                             <button onClick={handleEditSubmit}>Save</button>
//                         </div>
//                     ) : (
//                         <div>
//                             <p><strong>Email:</strong> {custData.email}</p>
//                             <p><strong>First Name:</strong> {custData.first_name}</p>
//                             <p><strong>Last Name:</strong> {custData.last_name}</p>
//                             <p><strong>Phone:</strong> {custData.phone}</p>
//                             <p><strong>Address:</strong> {custData.address}</p>
//                             <button onClick={() => setEditMode(true)}>Edit</button>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <p>Loading user data...</p>
//             )}
//         </div>
//     );
// };