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
    return fetch(`/Notebook/Create`, reqOptions.postAuthReqOption({title: title}))
            .then(response => response.json())
            .then(
                response => console.log(response)
            )
}