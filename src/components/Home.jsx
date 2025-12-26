import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { addToNotes, updateToNotes } from "../redux/noteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allNotes = useSelector((state) => state.note.notes);

  useEffect(() => {
    if (noteId) {
      const note = allNotes.find((p) => p._id === noteId);
      if (note) {
        setTitle(note.title);
        setValue(note.content);
      }
    }
  }, [noteId, allNotes]);

  const createNote = () => {
    if (title.trim() === "" && value.trim() === "") {
      toast.error("Title and content cannot be empty");
      return;
    }

    const note = {
      title,
      content: value,
      _id: noteId || Date.now().toString(36),
      createdAt: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    if (noteId) {
      dispatch(updateToNotes(note));
    } else {
      dispatch(addToNotes(note));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
    navigate("/notes");
  };

  return (
    <div className="home">
      <div className="home-header">
        <input
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="home-title-input"
        />

        <button onClick={createNote} className="home-btn">
          {noteId ? "Update note" : "Create note"}
        </button>
      </div>

      <textarea
        className="home-textarea"
        value={value}
        placeholder="Enter content here"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Home;
