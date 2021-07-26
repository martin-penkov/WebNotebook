import {authenticationService as auth} from '../services/auth'

export const requestOptions = {
    getReqOption,
    getAuthReqOption,
    postReqOption,
    postAuthReqOption    
};

function getReqOption(body) {
    return ({
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
    })
}

function getAuthReqOption(){

}

function postReqOption(body){
    return ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
}

function postAuthReqOption(body, jwtToken=JSON.parse(auth.currentUserValue()).token){
    return ({
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(body)
    })
}

//add delete, put req options only with auth permission