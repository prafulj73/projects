import React , { useContext } from "react";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-4">
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <Link to="/" className="btn btn-primary" onClick={()=>{deleteNote(note._id)}}>
            Delete
          </Link>
          <Link to="/" className="btn btn-primary mx-2" onClick={()=>{updateNote(note)}}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
