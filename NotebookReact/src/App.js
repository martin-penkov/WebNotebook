import {   Component, useState, useEffect } from 'react'
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


class App extends Component {
    // function userHandler() {
  //   let user1 = user
  //   console.log(user1)
  //   setUser(authenticationService.currentUserValue())
  // }
  // let response = authenticationService.login("martin", "martin")
  render(){
    return (
      
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
                    {/* <Route path='/create/notebook' component={}/> */}
                  
                </Switch>
            </div>
          </UserProvider>
        </BrowserRouter>
      
    )
  }
}


export default App;
