import React, { useContext, useEffect } from "react";
import {Context} from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const PictureSlider = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    
    
    return (
        <React.Fragment>
        <div className=" d-flex flex-nowrap overflow-scroll" style={{ width: "35%" } } >
            <img src="https://picsum.photos/id/1/400/550" alt="Random" />
            <img src="https://picsum.photos/id/1/400/550" alt="Random" />
            <img src="https://picsum.photos/id/1/400/550" alt="Random" />
            <img src="https://picsum.photos/id/1/400/550" alt="Random" />
            <img src="https://picsum.photos/id/1/400/550" alt="Random" />
            <img src="https://picsum.photos/id/1/400/550" alt="Random" />
            <img src="https://picsum.photos/id/1/400/550" alt="Random" />
            <img src="https://picsum.photos/id/1/400/550" alt="Random" />
            <img src="https://picsum.photos/id/1/400/550" alt="Random" />


            {/* {store.people.map((person, index) => (
                <PersonCard person={person} key={person.uid} />
            ))} */}
        </div>
    </React.Fragment>
    );
};