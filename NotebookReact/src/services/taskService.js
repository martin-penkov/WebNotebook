import { requestOptions as reqOptions} from '../helpers/requestOptions'

export const taskService = {
    getUserTasks,
    addTask,
    removeTask
}

async function getUserTasks() {
    let promise = await fetch('/Tasks/GetUserTasks', reqOptions.getAuthReqOption())

    let response = await promise.json();

    return response
}

async function addTask(text, inputDate){
    let targetDate = (new Date(inputDate)).toJSON()

    await fetch(`/Tasks/AddUserTask`, reqOptions.postAuthReqOption({text, targetDate}))
    // let response = await promise.json()
            
}

function removeTask(){

}