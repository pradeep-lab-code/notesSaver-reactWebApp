import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : [],
  },
  reducers: {
    addToNotes: (state, action) => {
      const note = action.payload;

      if (!note.title.trim() && !note.content.trim()) {
        toast.error("Cannot save empty note");
        return;
      }

      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note Created Successfully");
    },

    updateToNotes: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => item._id === note._id);

      if (index >= 0) {
        state.notes[index] = note;
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("Note Updated Successfully ");
      }
    },

    removeFromNotes: (state, action) => {
      const noteId = action.payload;
      const index = state.notes.findIndex((item) => item._id === noteId);

      if (index >= 0) {
        state.notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("Note Deleted");
      }
    },

    resetAllNotes: (state) => {
      state.notes = [];
      localStorage.removeItem("notes");
    },
  },
});

export const {
  addToNotes,
  updateToNotes,
  removeFromNotes,
  resetAllNotes,
} = noteSlice.actions;

export default noteSlice.reducer;
