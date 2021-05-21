import {authenticationService as auth} from '../services/auth';

export default function handleAuth(response){
    if(response.status != 200){
        auth.logout();
    }
}