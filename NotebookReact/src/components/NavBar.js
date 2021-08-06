import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { authenticationService } from './../services/auth';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import {authenticationButtons} from '../components/Authentication/AuthenticationButtons';
import {useContext} from 'react';
import { UserProvider } from '../contexts/UserProvider';


export default function NavBar(props)  {
    const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: #000000;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
  `;

    const auth = useContext(UserProvider);

    return (
        <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                <StyledLink to="/">
                  Web Notebook
                </StyledLink>
              </Typography>
              <Button variant="outlined" color="secondary" component={Link} to="/canvas">
                  Draw
              </Button>
              <Button variant="outlined" color="secondary" component={Link} to="/note">
                  Notes
              </Button>
              <div id="authButtons">
                {
                  auth === null ?
                   authenticationButtons.loginRegisterButtons(props) 
                   : authenticationButtons.logoutButton(props)
                }
              </div>
            </Toolbar>
          </AppBar>
    )
}