import { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter, Route, Switch,  } from 'react-router-dom'
import HomeWrapper from './components/HomeWrapper';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import {Canvas} from './components/Drawing/Canvas'
import NotebookContent from './components/Notebook/NotebookContent'
import NavBar from './components/NavBar'
import { authenticationService } from './services/auth';
import { UserProvider } from './contexts/UserProvider'


function App() {
  const [isLogged, setIsLogged] = useState();
  
  useEffect(() =>{
    userHandler()
  }, [])

  function userHandler() {
    setIsLogged(authenticationService.currentUserValue() === null ? false : true)
  }

  return (
    <UserProvider>
      <BrowserRouter >
        <div className="AppHolder">
          <header className="AppHeader">
            <NavBar userHandler={userHandler} isLogged={isLogged}/>
          </header>
            <Switch>
              <Route path='/' exact component={HomeWrapper}/>
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              <Route path='/canvas' component={Canvas}/>
              <Route path='/note' component={NotebookContent}/>
              {/* <Route path='/create/notebook' component={}/> */}
            </Switch>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
