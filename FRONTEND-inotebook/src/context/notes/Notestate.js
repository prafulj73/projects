import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInit = [];
  const [notes, setnotes] = useState(notesInit);

  //fetch all notes
  const fetchNotes = async () => {
    //API call

    const url = `${host}/notes/fetchAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log("fetch all notes", json);
    setnotes(json);
  };

  //add a note
  const addNote = async (title, description, tag) => {

    //add API
    console.log("adding a note!!");
      const url = `${host}/notes/AddNote`;
      try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      // console.log(json);
      console.log(json.savedNote);
      const note = json.savedNote; 
    setnotes(notes.concat(note));
  }
  catch(e){console.log(e);}

  };

  //delete a note
  const deleteNote = async (id) => {
    //delete api
    const url = `${host}/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API to update the note using id
    const url = `${host}/notes/updateNote/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag })
      });

      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));

      //logic to edit client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setnotes(newNotes);
    } catch (e) { console.log(e); }
  }

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
