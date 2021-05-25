import {authenticationService as auth} from './auth';
import {API_URL} from "../config";
import requestOptions from '../helpers/requestOptions';

export const notebookService = {
    createNotebook
}

function createNotebook(title){
    let username = JSON.parse(auth.currentUserValue).username
    let passObject = requestOptions.getAuthReqOption

    return fetch(`${API_URL}Notebook/Create`)
            .then()
}