import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Edit, Delete, Done } from "@mui/icons-material";

function Note(props) {
  const [editMode, setEditMode] = useState(false);
  const [initialInput, setInitialInput] = useState(props.note);

  const editClickHandler = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const contentEditHandler = (event) => {
    const { name, value } = event.target;

    setInitialInput(() => ({
      ...initialInput,
      [name]: value,
    }));
  };

  return (
    <div className="note">
      {!editMode ? (
        <button onClick={editClickHandler}>
          <Edit />
        </button>
      ) : (
        <button onClick={editClickHandler}>
          <Done />
        </button>
      )}

      {editMode ? (
        <>
          <TextField
            name="title"
            label="title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={initialInput.title}
            onChange={contentEditHandler}
          />
          <TextField
            name="content"
            label="content"
            variant="outlined"
            fullWidth
            margin="normal"
            rows={initialInput.content.split(" ").length / 3}
            multiline
            value={initialInput.content}
            onChange={contentEditHandler}
          />
        </>
      ) : (
        <>
          <h1>{initialInput.title}</h1>
          <p>{initialInput.content}</p>
        </>
      )}

      <button
        onClick={() => {
          props.onDelete(props.noteId);
        }}
      >
        <Delete />
      </button>
    </div>
  );
}

export default Note;
