import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ViewNote = () => {
  const { id } = useParams();
  const allNotes = useSelector((state) => state.note.notes);
  const note = allNotes.find((p) => p._id === id);

  if (!note) return <div className="home">Note not found</div>;

  return (
    <div className="home">
      <div className="home-header">
        <input
          type="text"
          value={note.title}
          disabled
          className="home-title-input"
        />

        <button
          className="home-btn"
          onClick={() => {
            navigator.clipboard.writeText(note.content);
            toast.success("Copied to clipboard");
          }}
        >
          Copy
        </button>
      </div>

      <textarea
        className="home-textarea"
        value={note.content}
        disabled
      />
    </div>
  );
};

export default ViewNote;
