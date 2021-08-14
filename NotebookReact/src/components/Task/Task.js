import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// return (<a href="#" className="list-group-item" onClick={() => {remove(todo.id)}}>{todo.text}</a>);

//   return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    backgroundColor: '#FFFFFF'
  },
}));


export default function Task(props) {
    const [textInput, setTextInput] = useState();
    const [dateInput, setDateInput] = useState();
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        //make server request => get all tasks for current user
      setTaskList(taskService.getUserTasks())

    }, [])
    const classes = useStyles();

  function addTodo(text, targetDate){
    // make server request => add task
    taskService.addTask(text, targetDate)
  }
  // Handle remove
  function handleRemove(id){
    // make server request => remove task

  }

  function formSubmitHandler(e) {
    e.preventDefault();
    addTodo(textInput);
  }

    return (
      <div>
        <h1>My Tasks</h1>
        <form onSubmit={(event) => formSubmitHandler(event)}>
            <TextField
              id="datetime-local"
              label="Finish Task until"
              type="datetime-local"
              defaultValue="2021-08-21T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <input className="form-control col-md-12"/>
            <br />
            <button type='submit'>Add Task</button>
        </form>
      </div>
    );
  
}