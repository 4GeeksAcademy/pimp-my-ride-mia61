import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/ProgressBar.css";


export const WorkOrderComments = ({ comments, woId, creationDate, updatedDate, refreshWorkOrder,  formatTime}) => {
  const { store, actions } = useContext(Context);
  const [newComment, setNewComment] = useState("");

  const handleNewComment = async (event) => {
    event.preventDefault()
    const success = await actions.NewCommentWorkOrder({
      comments: comments,
    });
    if (success) {
      await actions.getAllWorkOrders()
      // alert("Work Order Created Successfully!");
    } else {
      alert("something went wrong");
    }
  }
  
  
  return (
    <div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
        <textarea 
        class="form-control" 
        id="exampleFormControlTextarea1" 
        rows="3"
        value={newComment}
        onChange={ e => setNewComment(e.target.value) }
        ></textarea>
      </div>
      <div>
        <div class="list-group">
        {/* <p class="mb-1"> {creationDate} </p> */}
          { comments?.map((comment, index) => (
            <React.Fragment key={index}>
              <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                  
                <p class="mb-1"> {formatTime(new Date(comment.time_created))} </p>
                </div>
                <p class="mb-1">{comment.message}</p>
              </a>
              
            </React.Fragment>
          ))}
          <button class="btn-large pt-2 bg-dark text-light" onClick={ async () => {
                const success = await actions.NewCommentWorkOrder(woId, newComment)
                if(success) {
                  refreshWorkOrder()
                  setNewComment("")
                }
                }} > Add comment to Work Order </button>
        </div>  
      </div>
    </div>
  );
};
