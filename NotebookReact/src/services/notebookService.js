import {authenticationService as auth} from './auth';
import {API_URL} from "../config";
import requestOptions from '../helpers/requestOptions';

export const notebookService = {
    createNotebook
}

function createNotebook(title){
    let username = JSON.parse(auth.currentUserValue).username

    return fetch(`${API_URL}Notebook/Create`, requestOptions.getReqOption({username: username, title: title}))
            .then()
}