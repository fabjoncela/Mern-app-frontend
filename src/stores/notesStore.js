import { create } from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  //states like useState
  notes: null,

  createForm: {
    title: "",
    body: "",
  },
  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  //Functions here

  fetchNotes: async () => {
    //fetch the notes
    const res = await axios.get("http://localhost:3000/notes");

    //set to state
    //setNotes(res.data.notes);
    set({ notes: res.data.notes });
  },
  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    // setCreateForm({ ...createForm, [name]: value });
    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },
  createNote: async (e) => {
    e.preventDefault();
    //we get createForm from notesStore
    const { createForm, notes } = notesStore.getState();
    //create a new note
    const res = await axios.post("http://localhost:3000/notes", createForm);

    //update state
    // setNotes([...notes, res.data.note]);
    set({
      notes: [...notes, res.data.note],
      createForm: { title: "", body: "" },
    });
    //createForm to clear form state
  },
  deleteNote: async (_id) => {
    //delete the note
    const { notes } = notesStore.getState();
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    console.log(res);

    //update state
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });

    set({ notes: newNotes });
    // setNotes(newNotes);
  },
  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },
  toggleUpdate: (_id, title, body) => {
    //set state on update form
    console.log("haiii", { _id, title, body });

    set({
      updateForm: { title, body, _id },
    });
  },
  updateNote: async (e) => {
    e.preventDefault();

    //what states we get:
    const {
      updateForm: { title, body, _id },
      notes,
    } = notesStore.getState();

    //send the update request
    const res = await axios.put(`http://localhost:3000/notes/${_id}`, {
      title,
      body,
    });

    //update state
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNotes[noteIndex] = { ...newNotes[noteIndex], title, body };

    set({
      notes: newNotes,
      updateForm: { _id: null, title: "", body: "" },
      //clear update form state
    });
  },

  //end of thingy
}));

export default notesStore;
