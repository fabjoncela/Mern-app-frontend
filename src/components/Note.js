

export default function Note({ note, deleteNote, toggleUpdate }) {
  

  return (
    <div key={note._id}>
      <h3>{note.title}</h3>
      <button
        onClick={() => {
          deleteNote(note._id);
        }}
      >
        Delete Note
      </button>
      <button
        onClick={() => {
          toggleUpdate(note._id, note.title, note.body);
        }}
      >
        Update Note
      </button>
    </div>
  );
}
