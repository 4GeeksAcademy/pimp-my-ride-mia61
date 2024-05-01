import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/ProgressBar.css";


export const WorkOrderComments = ({ comments, woId, creationDate, updatedDate, refreshWorkOrder, formatTime }) => {
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
    <div style={{ padding: "20px", background: "#f8f9fa", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{ fontWeight: "bold", color: "#343a40" }}>Internal Notes</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          style={{ minHeight: "100px" }}
        ></textarea>
      </div>
      <div>
        <div className="list-group">
          {comments?.map((comment, index) => (
            <React.Fragment key={index}>
              <a href="#" className="list-group-item list-group-item-action active" aria-current="true" style={{ marginBottom: "5px", backgroundColor: "#6c757d", borderColor: "#6c757d" }}>
                <div className="d-flex w-100 justify-content-between">
                  <p className="mb-1" style={{ color: "white" }}>{formatTime(new Date(comment.time_created))}</p>
                </div>
                <p className="mb-1" style={{ color: "white" }}>{comment.message}</p>
              </a>
            </React.Fragment>
          ))}
          <button
            className="btn btn-dark"
            onClick={async () => {
              const success = await actions.NewCommentWorkOrder(woId, newComment);
              if (success) {
                refreshWorkOrder();
                setNewComment("");
              }
            }}
            style={{ marginTop: "10px", fontWeight: "bold" }}
          >
            Add comment to Work Order
          </button>
        </div>
      </div>
    </div>
  );
};
