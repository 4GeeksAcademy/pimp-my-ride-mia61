import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/ProgressBar.css";

export const WorkOrderComments = ({ comments, writeAccess }) => {
  const { store, actions } = useContext(Context);


  return (
    <div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <div>
        <div class="list-group">
          { comments?.map((comment, index) => (
            <React.Fragment key={index}>
              <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                  
                  <small>3 days ago</small>
                </div>
                <p class="mb-1">{comment.message}</p>
              </a>
            </React.Fragment>
          ))}
          
        </div>  
      </div>
    </div>
  );
};
