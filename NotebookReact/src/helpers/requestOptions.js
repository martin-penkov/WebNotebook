import {authenticationService as auth} from '../services/auth'

export const requestOptions = {
    getReqOption,
    getAuthReqOption,
    postReqOption,
    postAuthReqOption    
};

function getReqOption() {
    return ({
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
    })  
}

function getAuthReqOption(){
    let jwtToken = auth.currentUserValue().token
    return ({
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    })
}

function postReqOption(body){
    return ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
}

function postAuthReqOption(body){
    let jwtToken = auth.currentUserValue().token
    let returnobj = ({
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(body)
    })

    console.log(returnobj)
    return returnobj
}

//add delete, put req options only with auth permission