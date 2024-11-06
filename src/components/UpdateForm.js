import React from "react";
import notesStore from "../stores/notesStore";

function UpdateForm() {
  const store = notesStore();

  if (!store.updateForm._id) return <></>;

  return (
    <div className="update-notes">
      <h2>Update note</h2>
      <form onSubmit={store.updateNote}>
        <input
          onChange={store.handleUpdateFieldChange}
          value={store.updateForm.title}
          name="title"
        />
        <textarea
          onChange={store.handleUpdateFieldChange}
          value={store.updateForm.body}
          name="body"
        />
        <button type="submit">Update note</button>
      </form>
    </div>
  );
}

export default UpdateForm;
