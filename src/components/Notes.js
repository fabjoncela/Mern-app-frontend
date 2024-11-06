import notesStore from "../stores/notesStore";
import Note from "./Note";

export default function Notes() {
  const store = notesStore();
  return (
    <div className="get-notes">
      <h2>Notes:</h2>
      {store.notes &&
        store.notes.map((note) => {
          return (
            <Note
              note={note}
              key={note._id}
              deleteNote={store.deleteNote}
              toggleUpdate={store.toggleUpdate}
            />
          );
        })}
    </div>
  );
}
