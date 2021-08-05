import { React, useState, useEffect } from 'react'
import { authenticationService } from './services/auth';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

let authenticationButtons = 
    <div>
      <Button variant="outlined" color="secondary" component={Link} to="/login">
          Login
      </Button>
      <Button variant="outlined" color="secondary" component={Link} to="/register">
          Register
      </Button>
    </div>
  
let logoutButton = 
    <Button variant="outlined" color="secondary" component={Link} to="/" onClick={authenticationService.logout}>
      Logout
    </Button>;

export default function AuthenticationButtons() {
    const [userValue, setUserValue] = useState();

    useEffect(() => {
        setUserValue(authenticationService.currentUserValue)
    }, [])

    return (
        userValue ? authenticationButtons : logoutButton
    );
}