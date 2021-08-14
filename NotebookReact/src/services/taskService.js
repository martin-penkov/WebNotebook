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

function addTask(text, targetDate){
    let parsedDate = (new Date(targetDate)).toJSON()

    return fetch(`/Tasks/AddUserTask`, reqOptions.postAuthReqOption({text, parsedDate}))
            .then(response => response.json())
            .then(
                response => console.log(response)
            )
}

function removeTask(){

}