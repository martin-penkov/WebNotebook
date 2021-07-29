import {authenticationService as auth} from './auth';
import {API_URL} from "../config";
import {requestOptions as reqOptions} from '../helpers/requestOptions';

export const notebookService = {
    getUserItems,
    createNotebook
}

function getUserItems(){
    // let username =  JSON.parse(auth.currentUserValue).username  
    var req = reqOptions.getAuthReqOption()
    var userData = fetch(`${API_URL}Notebook/GetAll`, req)
    .then(response => {
        response.json()
        console.log(response)
    })
    .then(response => console.log(response))

    return null
}

function createNotebook(title){
    let username = JSON.parse(auth.currentUserValue).username

    return fetch(`${API_URL}Notebook/Create`, reqOptions.postAuthReqOption({username: username, title: title}))
            .then(response => response.json())
            .then(
                response => console.log(response)
            )
}