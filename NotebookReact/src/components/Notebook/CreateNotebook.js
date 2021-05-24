import React, {useState} from 'react';
import {Typography, TextField, Button} from '@material-ui/core';

export default function CreateNotebook(props){
    const [title, setTitle] = useState('');

    function handleSubmit(event){
        event.preventDefault();

    }

    return (
        <form hidden={!props.activate}>
            <Typography variant="h5" style={{ margin: 8 }}>
                  Create new notebook
            </Typography>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    className="form-input"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="form-input"
                    size="large"
                    onClick={handleSubmit}
                  >
                    Create
                  </Button>
        </form>
    )
}