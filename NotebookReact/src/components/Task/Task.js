import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService';
import DatePicker from './DatePicker'
import '../../styleSheets/Task.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

// return (<a href="#" className="list-group-item" onClick={() => {remove(todo.id)}}>{todo.text}</a>);

//   return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);




export default function Task(props) {
    const [textInput, setTextInput] = useState();
    const [dateInput, setDateInput] = useState();
    const [taskList, setTaskList] = useState([]);

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        //make server request => get all tasks for current user
      collectTaskList()
    }, [])
    


  let collectTaskList = async function(){
    let data = await taskService.getUserTasks();
    data = data.map((x) => {return {show: true, id: x.id, text: x.text, targetDate: new Date(x.targetDate)}})
    setTaskList(data)
  }

  async function addTodo(text, targetDate){
    // make server request => add task
    await taskService.addTask(text, targetDate)
    collectTaskList()
  }
  // Handle remove
  async function handleRemove(id){
    // make server request => remove task
    console.log(id)
    setTaskList(taskList.filter(x => x.id !== id))
    await taskService.removeTask(id)
    collectTaskList()
  }

  function filterTodos(){
    let startDateObj = new Date(startDate);
    let endDateObj = new Date(endDate);

    let filteredTasks = taskList.map((x) => (x.targetDate > startDateObj && x.targetDate < endDateObj) ? 
    {show:true, id: x.id, text:x.text, targetDate: x.targetDate} :
    {show:false, id: x.id, text:x.text, targetDate: x.targetDate})
    
    setTaskList(filteredTasks)
    console.log(taskList)
  }


  function formSubmitHandler(e) {
    e.preventDefault();
    addTodo(textInput, dateInput);
  }

    return (
      <div className="todolist">
        <div className="todoTitleHeading">
        <h1 className="todoTitle">My Tasks</h1>
        </div>
        <form onSubmit={(event) => formSubmitHandler(event)}>
            <DatePicker setFunction={setDateInput} inputText={"Finish Task until"}></DatePicker>
            <input className="form-control col-md-12" onChange={(e) => setTextInput(e.target.value)}/>
            <br />
            <button type='submit'>Add Task</button>
        </form>

      <div className="todoItems">
        <div className="filterMenu">
          From: {<DatePicker filterFunc={filterTodos} setFunction={setStartDate} customWidth="260px"/>}
        </div>
        <div>
          Untill: {<DatePicker filterFunc={filterTodos} setFunction={setEndDate} customWidth="260px"/>}
        </div>
        <button onClick={filterTodos}>SORT</button>
        <ul>
          {taskList.length !== 0 && taskList.map((el) => {
            return el.show && (<li key={el.id}>
              <div className="taskTitleLi">{el.text}</div> untill {`${el.targetDate.getHours()}:${el.targetDate.getMinutes()}`}
              <Button
                className="listButton"
                variant="contained"
                color="#c44b3e"
                startIcon={<DeleteIcon />}
                onClick={() => handleRemove(el.id)}
              >
                Delete
              </Button>
              </li>)
          })}
        </ul>
      </div>
      </div>
    );
  
}