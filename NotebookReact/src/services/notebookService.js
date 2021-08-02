import {authenticationService as auth} from './auth';
import {API_URL} from "../config";
import {requestOptions as reqOptions} from '../helpers/requestOptions';

export const notebookService = {
    getUserItems,
    createNotebook
}

async function getUserItems(){
    var req = reqOptions.getAuthReqOption()
    let response =  await fetch(`/Notebook/GetAll`, req)
    let data = await response.json()
    return data
}

function createNotebook(title){
    let username = JSON.parse(auth.currentUserValue).username

    return fetch(`${API_URL}Notebook/Create`, reqOptions.postAuthReqOption({username: username, title: title}))
            .then(response => response.json())
            .then(
                response => console.log(response)
            )
}