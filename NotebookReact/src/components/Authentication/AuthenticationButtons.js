import { React } from 'react'
import { authenticationService } from '../../services/auth';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

let loginRegisterButtons = (props) => {
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
    

let logoutButton = (props) => {
    return (
        <Button variant="outlined" color="secondary" component={Link} to="/" onClick={authenticationService.logout}>
            Logout
        </Button>
    )
} 
    

export const authenticationButtons = {
    loginRegisterButtons,
    logoutButton
}