import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Addnote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (e) => {
    // stops the page from reloading after submitting the form
    e.preventDefault();
    // console.log("inside handle submit",note.tag);
    addNote(note.title,note.description,note.tag);
    setnote({title:"",description:"",tag:""});
  };
  //to handle multiple input forms we have used one onchnage method here
  // to do this, we have created a dynamic key which can be changed with the value of target name
  // event gives us the data related to the text field whihch is bein operated right now
  // event.target gives us the data inside that particular target text box, and name field we have used accoridng to keys
  // in the note schema
  const onChange = (e) => {
    setnote({
      ...note,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title *
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description *
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default Addnote;
