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
      collectTaskList()

    }, [])
    const classes = useStyles();


  let collectTaskList = async function(){
    let data = await taskService.getUserTasks();
    setTaskList(data)
  }

  function addTodo(text, targetDate){
    // make server request => add task
    taskService.addTask(text, targetDate, collectTaskList)
  }
  // Handle remove
  function handleRemove(id){
    // make server request => remove task

  }

  function formSubmitHandler(e) {
    e.preventDefault();
    addTodo(textInput, dateInput);
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
              onChange={(e) => setDateInput(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <input className="form-control col-md-12" onChange={(e) => setTextInput(e.target.value)}/>
            <br />
            <button type='submit'>Add Task</button>
        </form>

        <ul>
          {taskList.length !== 0 && taskList.map((el) => {
            return (<li key={el.id}>{el.text} untill {el.targetDate}</li>)
          })}
        </ul>
      </div>
    );
  
}