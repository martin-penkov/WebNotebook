import {API_URL} from "../config";
import {requestOptions} from '../helpers/requestOptions'
import { UserProvider } from './../contexts/UserProvider'
import { useContext } from 'react'


export const authenticationService = {
    register,
    login,
    logout,
    currentUserValue
};

function currentUserValue () { return JSON.parse(localStorage.getItem('currentUser')); }

function register(username, password) {
    let registerObject = {username: username, password: password}

    return fetch('identity/register', requestOptions.postReqOption(registerObject))
    .then((response) => {
        if(response.ok){
            return response.json();
        }
        else{
            throw response
        }
    })
    .catch(error => {
        async function getErrorMessage(){
            console.log(error)
            //let jsonObj = await error.json()
            return alert()
        }
        getErrorMessage()
    })
}

function login(username, password) {
    let loginObject = {username: username, password: password}

    return fetch(`${API_URL}identity/login`, requestOptions.postReqOption(loginObject))
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
            const { updateLoginStatus } = useContext(UserProvider);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            updateLoginStatus()
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
    // remove user from local storage to log user 
    localStorage.removeItem('currentUser');
}