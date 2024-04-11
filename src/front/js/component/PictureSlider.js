import React, { useContext, useEffect } from "react";
import {Context} from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const PictureSlider = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    
    
    return (
        <React.Fragment>
        <div  id="cardDiv" className=" d-flex flex-nowrap overflow-scroll" style={{ width: "50%" } } >
            <img src="https://picsum.photos/id/1/200/300" alt="Random" />
            <img src="https://picsum.photos/id/1/200/300" alt="Random" />
            <img src="https://picsum.photos/id/1/200/300" alt="Random" />
            <img src="https://picsum.photos/id/1/200/300" alt="Random" />
            <img src="https://picsum.photos/id/1/200/300" alt="Random" />
            <img src="https://picsum.photos/id/1/200/300" alt="Random" />
            <img src="https://picsum.photos/id/1/200/300" alt="Random" />
            <img src="https://picsum.photos/id/1/200/300" alt="Random" />
            <img src="https://picsum.photos/id/1/200/300" alt="Random" />


            {/* {store.people.map((person, index) => (
                <PersonCard person={person} key={person.uid} />
            ))} */}
        </div>
    </React.Fragment>
    );
};