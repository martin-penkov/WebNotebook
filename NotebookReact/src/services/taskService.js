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

function addTask(text, inputDate, refreshFunction){
    let targetDate = (new Date(inputDate)).toJSON()

    return fetch(`/Tasks/AddUserTask`, reqOptions.postAuthReqOption({text, targetDate}))
            .then(response => response.json())
            .then(
                response => refreshFunction()
            )
}

function removeTask(){

}