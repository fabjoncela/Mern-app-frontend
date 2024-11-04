import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  //State
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });

  //Use effect
  useEffect(() => {
    fetchNotes();
  }, []);

  //Functions
  const fetchNotes = async () => {
    //fetch the notes
    const res = await axios.get("http://localhost:3000/notes");
    //set to state
    setNotes(res.data.notes);
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({...createForm,  [name]: value}); 

  };

  return (
    <div className="App">
      <div className="get-notes">
        <h2>Notes:</h2>
        {notes &&
          notes.map((note) => {
            return (
              <div key={note._id}>
                <h3>{note.title}</h3>
              </div>
            );
          })}
      </div>
      <div>
        <h2>Create Note</h2>
        <form>
          <input
            onChange={updateCreateFormField}
            value={createForm.title}
            type="text"
            name="title"
            placeholder="Title"
          />
          <textarea
            onChange={updateCreateFormField}
            value={createForm.body}
            name="body"
          />
          <button type="submit">Create note</button>
        </form>
      </div>
    </div>
  );
}

export default App;
