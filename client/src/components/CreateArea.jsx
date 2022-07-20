import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import { Grid, Fab, Zoom } from "@mui/material";

const CreateArea = (props) => {
  const [expand, setExpand] = useState({
    status: false,
    rows: 1,
  });

  const [inputNote, setInputNote] = useState({
    noteId: "",
    title: "",
    content: "",
  });

  const stageNote = (event) => {
    const newId = uuidv4();
    const { name, value } = event.target;
    setInputNote((oldObject) => {
      return {
        ...oldObject,
        [name]: value,
        noteId: newId,
      };
    });
  };

  return (
    <Grid container>
      <form
        className="create-note"
        onSubmit={(event) => {
          props.onClicked(inputNote);
          setInputNote({
            noteId: "",
            title: "",
            content: "",
          });
          event.preventDefault();
        }}
      >
        {expand.status && (
          <input
            name="title"
            placeholder="Title"
            onChange={stageNote}
            value={inputNote.title}
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={expand.rows}
          onChange={stageNote}
          onClick={() => {
            setExpand({
              status: true,
              rows: 3,
            });
          }}
          value={inputNote.content}
        />
        <Zoom in={expand.status}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </Grid>
  );
};

export default CreateArea;
