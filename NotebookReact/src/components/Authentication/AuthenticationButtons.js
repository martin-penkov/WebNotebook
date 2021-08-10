import { React, useContext } from 'react'
import { authenticationService } from '../../services/auth';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../contexts/AuthContext'

let loginRegisterButtons = () => {
    

    return(
    <div>
      <Button variant="outlined" color="secondary" component={Link} to="/login">
          Login
      </Button>
      <Button variant="outlined" color="secondary" component={Link} to="/register">
          Register
      </Button>
    </div>
    )
}
    

let LogoutButton = () => {
     const { setUser } = useContext(AuthContext);

    return (
        <Button variant="outlined" color="inherit" component={Link} to="/" onClick={() => {
            setUser(null);
            authenticationService.Logout();
            }}>
            Logout
        </Button>
    )
} 


export const authenticationButtons = {
    loginRegisterButtons,
    LogoutButton
}