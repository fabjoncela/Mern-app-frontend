import React from "react";
import notesStore from "../stores/notesStore";

function CreateForm() {
  const store = notesStore();
  if (store.updateForm._id) return <></>;

  return (
    <div className="create-notes">
      <h2>Create Note</h2>
      <form onSubmit={store.createNote}>
        <input
          onChange={store.updateCreateFormField}
          value={store.createForm.title}
          type="text"
          name="title"
          placeholder="Title"
        />
        <textarea
          onChange={store.updateCreateFormField}
          value={store.createForm.body}
          name="body"
        />
        <button type="submit">Create note</button>
      </form>
    </div>
  );
}

export default CreateForm;
