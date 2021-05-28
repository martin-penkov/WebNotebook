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

function postAuthReqOption(){

}

//add delete, put req options only with auth permission