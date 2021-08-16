import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService';
import DatePicker from './DatePicker'
import '../../styleSheets/Task.css'

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
  function handleRemove(id){
    // make server request => remove task

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
          From: {<DatePicker filterFunc={filterTodos} setFunction={setStartDate} customWidth="100px"/>} untill {<DatePicker filterFunc={filterTodos} setFunction={setEndDate} customWidth="100px"/>}
        </div>
        <button onClick={filterTodos}>SORT</button>
        <ul>
          {taskList.length !== 0 && taskList.map((el) => {
            return el.show && (<li key={el.id}>
              {el.text} untill {`${el.targetDate.getFullYear()}/${el.targetDate.getMonth() + 1}/${el.targetDate.getDate()} ${el.targetDate.getHours()}:${el.targetDate.getMinutes()}`}
              </li>)
          })}
        </ul>
      </div>
      </div>
    );
  
}