import React from 'react'
import {authenticationService as auth} from '../services/auth'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'

export default class HomeWrapper extends React.Component{


    checkUserLoginStatus(){
        return auth.currentUserValue()
    }

    render(){
        if(this.checkUserLoginStatus()){
            //jwt auth token found in browser local storage
            return (
            <div className='personDashboard'>
                <Dashboard/>
            </div>
            )
        }
        //show landing page with options for user login...
        return <LandingPage/>
    }
}