import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeWrapper from './components/HomeWrapper';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="AppHolder">
      <header className="AppHeader">
        <h1 className="AppNavbar">
          Here We Go Again
        </h1>
      </header>
      <hr/>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomeWrapper}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
