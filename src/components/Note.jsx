import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNotes } from "../redux/noteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Note = () => {
  const notes = useSelector((state) => state.note.notes || []);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (noteId) => {
    dispatch(removeFromNotes(noteId));
  };

  return (
    <div className="all-notes">
      <input
        className="notes-search"
        type="search"
        placeholder="Search notes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="cards">
        {filteredData.map((note) => (
          <div key={note._id} className="note-card">
            <div className="note-title">{note.title}</div>
            <div className="note-content">{note.content}</div>

            <div className="note-actions">
              <Link to={`/?noteId=${note._id}`} className="edit-btn">
                Edit
              </Link>

              <Link to={`/notes/${note._id}`} className="view-btn">
                View
              </Link>

              <button
                className="delete-btn"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>

              <button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(note.content);
                  toast.success("Copied to clipboard");
                }}
              >
                Copy
              </button>
            </div>

            <div className="note-date">{note.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
