import {API_URL} from "../config";
import handleAuth from '../helpers/handleAuth'

export const authenticationService = {
    login,
    logout,
    currentUserValue
};

function currentUserValue () { return JSON.parse(localStorage.getItem('currentUser')); }

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${API_URL}identity/login`, requestOptions)
        //.then(handleAuth(response))
        .then((response) => {
            if(response.ok){
                return response.json();
            }
            else{
                throw response
            }
        })
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        })
        .catch(error => {
            async function getErrorMessage(){
                let jsonObj = await error.json()
                return alert(jsonObj.title)
            }
            getErrorMessage()
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}