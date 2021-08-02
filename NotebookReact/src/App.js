import './App.css';
import { BrowserRouter, Route, Switch, NavLink, Link } from 'react-router-dom'
import HomeWrapper from './components/HomeWrapper';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import styled from 'styled-components';
import {Canvas} from './components/Drawing/Canvas'

function App() {
  const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: #000000;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
  `;

  return (
    <BrowserRouter >
      <div className="AppHolder">
        <header className="AppHeader">
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                <StyledLink to="/">
                  Web Notebook
                </StyledLink>
              </Typography>
              <Button variant="outlined" color="secondary" component={Link} to="/login">
                  Login
              </Button>
              <Button variant="outlined" color="secondary" component={Link} to="/register">
                  Register
              </Button>
              <Button variant="outlined" color="secondary" component={Link} to="/canvas">
                  Draw
              </Button>
            </Toolbar>
          </AppBar>
        </header>
          <Switch>
            <Route path='/' exact component={HomeWrapper}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/canvas' component={Canvas}/>
            {/* <Route path='/create/notebook' component={}/> */}
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
