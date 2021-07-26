import {authenticationService as auth} from './auth';
import {API_URL} from "../config";
import requestOptions from '../helpers/requestOptions';

export const notebookService = {
    createNotebook
}

function getUserItems(){
    let username =  JSON.parse(auth.currentUserValue).username  

    
}

function createNotebook(title){
    let username = JSON.parse(auth.currentUserValue).username

    return fetch(`${API_URL}Notebook/Create`, requestOptions.postAuthReqOption({username: username, title: title}))
            .then(response => response.json())
            .then(
                console.log(response)
            )
}