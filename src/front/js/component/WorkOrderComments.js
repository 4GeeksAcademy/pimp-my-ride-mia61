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


//   return (
//     <div style={{ padding: "20px", background: "#f8f9fa" }}>
//       <div className="mb-3">
//         <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{ fontWeight: "bold", fontSize:"20px", color: "#343a40" }}>Internal Notes</label>
//         <textarea
//           className="form-control"
//           id="exampleFormControlTextarea1"
//           rows="3"
//           value={newComment}
//           onChange={e => setNewComment(e.target.value)}
//           style={{ minHeight: "100px", width: "100%" }}
//         ></textarea>
//       </div>
//       <div>
//         <div className="list-group">
//           {comments?.map((comment, index) => (
//             <React.Fragment key={index}>
//               <a href="#" className="list-group-item list-group-item-action active" aria-current="true" style={{ marginBottom: "5px", fontSize:"20px", backgroundColor: "#6c757d", borderColor: "#6c757d" }}>
//                 <div className="d-flex w-100 justify-content-between">
//                   <p className="mb-1" style={{ color: "white" }}>{formatTime(new Date(comment.time_created))}</p>
//                 </div>
//                 <p className="mb-1" style={{ color: "white" }}>{comment.message}</p>
//               </a>
//             </React.Fragment>
//           ))}
//           <button
//             className="btn btn-dark"
//             onClick={async () => {
//               const success = await actions.NewCommentWorkOrder(woId, newComment);
//               if (success) {
//                 refreshWorkOrder();
//                 setNewComment("");
//               }
//             }}
//             style={{paddingBottom: "8px", width: "30%", marginBottom:"10px", borderRadius: "5px", backgroundColor: "#343a40",}}
//           >
//             Add comment to Work Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
return (
  <div style={{ padding: "20px", background: "#f8f9fa", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)" }}>
    <div className="mb-4">
      <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{ fontWeight: "bold", fontSize: "20px", color: "#343a40" }}>Internal Notes</label>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="4"
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        style={{ minHeight: "100px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", padding: "10px", fontSize: "16px" }}
      ></textarea>
    </div>
    <div>
      <div className="list-group">
        {comments?.map((comment, index) => (
          <React.Fragment key={index}>
            <div className="list-group-item d-flex justify-content-between align-items-start" style={{ marginBottom: "10px", backgroundColor: "#343a40", borderColor: "#343a40", color: "#fff", borderRadius: "5px" }}>
              <div>
                <p style={{ fontSize: "14px", color: "#ccc", marginBottom: "5px" }}>{formatTime(new Date(comment.time_created))}</p>
                <p style={{ fontSize: "16px" }}>{comment.message}</p>
              </div>
            </div>
          </React.Fragment>
        ))}
        <div className="d-flex justify-content-center"> {/* Centered container for the button */}
          <button
            className="btn btn-dark"
            onClick={async () => {
              const success = await actions.NewCommentWorkOrder(woId, newComment);
              if (success) {
                refreshWorkOrder();
                setNewComment("");
              }
            }}
            style={{ width: "50%", marginBottom: "20px", borderRadius: "5px", backgroundColor: "#343a40", color: "#fff", fontSize: "16px", fontWeight: "bold" }}
          >
            Add Comment to Work Order
          </button>
        </div>
      </div>
    </div>
  </div>
);

};
