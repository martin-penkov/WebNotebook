import React from 'react'
import {authenticationService as auth, authenticationService} from '../services/auth'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'

export default class HomeWrapper extends React.Component{
    constructor(props){
        super(props);
        this.state = { 'userValue': null }
    }

    checkUserLoginStatus(){
        return auth.currentUserValue()
    }

    componentWillMount(){
        // setUserValue(authenticationService.currentUserValue)
        // setReturnAuth(userValue === undefined ? authenticationButtons : logoutButton)
        this.setState({ 'userValue': authenticationService.currentUserValue })
    }

    render(){
        if(this.checkUserLoginStatus()){
            //jwt auth token found in browser local storage
            return (
            <div className='personDashboard'>
                <Dashboard isLogged={this.state.userValue}/>
            </div>
            )
        }
        //show landing page with options for user login...
        return <LandingPage/>
    }
}