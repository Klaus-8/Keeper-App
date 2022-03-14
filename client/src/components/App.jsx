import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [allNotes, setAllNotes] = useState([]);

  const addNote = (newNote) => {
    setAllNotes((oldNotes) => {
      return [...oldNotes, newNote];
    });
  };

  const deleteNote = (noteId) => {
    setAllNotes(allNotes.filter((n) => n.id !== noteId));
  };

  return (
    <div>
      <Header />
      <CreateArea onClicked={addNote} />
      {allNotes.map((singleNote) => (
        <Note
          key={singleNote.id}
          id={singleNote.id}
          title={singleNote.title}
          content={singleNote.content}
          note={singleNote}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
