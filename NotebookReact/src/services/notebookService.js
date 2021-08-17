import {requestOptions as reqOptions} from '../helpers/requestOptions';

export const notebookService = {
    getUserItems,
    createNotebook,
    createNote,
    getuserNotes,
    getNote
}

async function getUserItems(){
    var req = reqOptions.getAuthReqOption()
    let response =  await fetch(`/Notebook/GetAll`, req)
    let data = await response.json()
    return data
}

function createNotebook(title){
    return fetch(`/Notebook/Create`, reqOptions.postAuthReqOption({title: title}))
            .then(response => response.json())
            .then(
                response => console.log(response)
            )
}

function createNote(content){
    return fetch('/Notebook/CreateNote', reqOptions.postAuthReqOption({content: content}))
                .then(response => response.json())
}

async function getuserNotes(){
    let promise = await fetch('/Notebook/GetUserNotes', reqOptions.getAuthReqOption())    

    let response = await promise.json()

    return response
}

async function getNote(id){
    let promise = await fetch(`/Notebook/GetNoteById/${id}`, reqOptions.getAuthReqOption())

    let response = await promise.json()

    return response
}