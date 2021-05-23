import React from 'react'
import {authenticationService as auth} from '../services/auth'
import LandingPage from './LandingPage'
import Album from './test'

export default class HomeWrapper extends React.Component{
    constructor(props){
        super(props)

        
    }

    checkUserLoginStatus(){
        return auth.currentUserValue()
    }

    render(){
        if(this.checkUserLoginStatus()){
            //jwt auth token found in browser local storage
            return (
            <div className='personDashboard'>
                <Album/>
            </div>
            )
        }
        //show landing page with options for user login...
        return <LandingPage/>
    }
}