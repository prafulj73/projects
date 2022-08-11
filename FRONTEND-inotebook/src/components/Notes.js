import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

function Notes() {
  const context = useContext(noteContext)
  const { notes, fetchNotes, editNote } = context
  const [note, setnote] = useState({ id: '', etitle: '', edescription: '', etag: '' })

  const Navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
      fetchNotes()
    else{
      Navigate('/login');
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = currentNote => {
    ref.current.click()
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    })
  }

  const handleUpdate = e => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
  }

  const onChange = e => {
    setnote({
      ...note,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Addnote />

      <button
        type='button'
        className='btn btn-primary d-none'
        ref={ref}
        data-toggle='modal'
        data-target='#exampleModal'
      >
        Launch demo modal
      </button>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit Note
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form className='my-3'>
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='etitle'
                    name='etitle'
                    aria-describedby='emailHelp'
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Description
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='edescription'
                    name='edescription'
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='tag' className='form-label'>
                    Tag
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='etag'
                    name='etag'
                    value={note.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                type='button'
                className='btn btn-primary'
                onClick={handleUpdate}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h1>your Notes</h1>
        {notes.length === 0 && <div className="my-3 container" style={{ color: "red" }}> No Notes to be displayed at this moment!!</div>}
        {notes.map(note => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} />
        })}
      </div>
    </>
  )
}

export default Notes
