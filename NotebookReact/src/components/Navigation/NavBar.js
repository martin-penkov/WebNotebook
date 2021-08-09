import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { authenticationService } from '../../services/auth';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import {authenticationButtons} from '../Authentication/AuthenticationButtons';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useState} from 'react'
import '../../styleSheets/NavBar.css';
import { SidebarData } from './SideBarData'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(2),
  }
}));



export default function NavBar(props)  {
    const classes = useStyles();
    const [sidebar, setSidebar] = useState(false);
    const { setUser } = useContext(AuthContext);

    const showSidebar = () => setSidebar(!sidebar);

    const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: #000000;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
  `;

    const user = useContext(AuthContext);
    console.log(user)

    return (
        <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon onClick={showSidebar} />
              </IconButton>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                <StyledLink to="/">
                  Web Notebook
                </StyledLink>
              </Typography>
              <Button className={classes.button} variant="outlined" color="inherit" component={Link} to="/canvas">
                  Draw
              </Button>
              <Button variant="outlined" color="inherit" component={Link} to="/note">
                  Notes
              </Button>
              <div id="authButtons">
                {
                  user.user !== null &&
                   authenticationButtons.LogoutButton(props)
                }
              </div>

              <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                  <li className='navbar-toggle'>
                    <Link to='#' className='menu-bars'>
                      <MenuOpenIcon />
                    </Link>
                  </li>
                  {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                  
                  {user.user !== null && 
                      <li className={'nav-text'} onClick={() => {
                        authenticationService.Logout()
                        setUser(null)
                        }}>
                        <Link >
                          <ExitToAppIcon />
                          <span>Logout</span>
                        </Link> 
                      </li>
                  }
                </ul>
              </nav>

            </Toolbar>
          </AppBar>
    )
}