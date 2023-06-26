import React, { useState } from "react";

import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editedNote, setEditedNote] = useState({ title: "", content: "" });

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewNote({ title: "", content: "" });
  };

  const createNote = () => {
    const timestamp = new Date().toLocaleString();
    const note = { ...newNote, timestamp };
    setNotes([...notes, note]);
    closeCreateModal();
  };

  const openPreviewModal = (note) => {
    const isButtonClicked = !!(
      window.event && window.event.target.tagName.toLowerCase() === "button"
    );
    if (!isButtonClicked) {
      setSelectedNote(note);
      setShowPreviewModal(true);
    }
  };

  const closePreviewModal = () => {
    setSelectedNote(null);
    setShowPreviewModal(false);
  };

  const openEditModal = (note) => {
    setSelectedNote(note);
    setShowEditModal(true);
    setEditedNote({ title: note.title, content: note.content });
  };

  const closeEditModal = () => {
    setSelectedNote(null);
    setShowEditModal(false);
    setEditedNote({ title: "", content: "" });
  };

  const updateNote = () => {
    const updatedNote = { ...selectedNote, ...editedNote };
    const updatedNotes = notes.map((note) =>
      note === selectedNote ? updatedNote : note
    );
    setNotes(updatedNotes);
    closeEditModal();
  };

  const deleteNote = (note) => {
    const updatedNotes = notes.filter((n) => n !== note);
    setNotes(updatedNotes);
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("modal")) {
      closeCreateModal();
      closePreviewModal();
      closeEditModal();
    }
  };

  return (
    <div className="app" onClick={handleOutsideClick}>
      <h1>Notes App</h1>
      <button className="create-button" onClick={openCreateModal}>
        Add Note
      </button>

      {notes.map((note, index) => (
        <div
          key={index}
          className="note"
          onClick={() => openPreviewModal(note)}
        >
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <div className="note-actions">
            <button onClick={() => openEditModal(note)}>Edit</button>
            <button onClick={() => deleteNote(note)}>Delete</button>
          </div>
        </div>
      ))}

      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create</h2>
            <form>
              <label className="note-title">Title:</label>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
              />
              <label className="note-content">Content:</label>
              <textarea
                className="note-content"
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({ ...newNote, content: e.target.value })
                }
              ></textarea>
              <button onClick={createNote}>Create</button>
              <button onClick={closeCreateModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showPreviewModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedNote.title}</h2>
            <p>{selectedNote.content}</p>
            <button onClick={closePreviewModal}>Close</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Note</h2>
            <form>
              <label>Title:</label>
              <input
                type="text"
                value={editedNote.title}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, title: e.target.value })
                }
              />
              <label>Content:</label>
              <textarea
                value={editedNote.content}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, content: e.target.value })
                }
              ></textarea>
              <button onClick={updateNote}>Update</button>
              <button onClick={closeEditModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
