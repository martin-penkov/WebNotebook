import { Component } from 'react'
import './styleSheets/App.css';
import { BrowserRouter, Route, Switch,  } from 'react-router-dom'
import HomeWrapper from './components/HomePages/HomeWrapper';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import {Canvas} from './components/Drawing/Canvas'
import NotebookContent from './components/Notebook/NotebookContent'
import NavBar from './components/Navigation/NavBar'
import { UserProvider } from './contexts/UserProvider'
import Gallery from './components/Images/Gallery'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b5e20',
      light: '#4c8c4a',
      dark: '#003300',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#a5d6a7',
      light: '#d7ffd9',
      dark: '#75a478',
      contrastText: '#212121',
    },
  },
});


class App extends Component {
  render(){
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter >
          <UserProvider>
            <div className="AppHolder">
                <header className="AppHeader">
                  <NavBar/>
                </header>
                <Switch>
                  <Route path='/' exact component={HomeWrapper}/>
                  <Route path='/login' component={Login}/>
                  <Route path='/register' component={Register}/>
                  <Route path='/canvas' component={Canvas}/>
                  <Route path='/note' component={NotebookContent}/>
                  <Route path='/gallery' component={Gallery}/>
                </Switch>
            </div>
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}


export default App;
