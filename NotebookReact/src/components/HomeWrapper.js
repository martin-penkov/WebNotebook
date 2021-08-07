import { React, useContext} from 'react'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import {AuthContext} from './../contexts/AuthContext'

export default function HomeWrapper() {
    const user = useContext(AuthContext);


    if(user.user !== null){
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