import React from 'react'
import { authenticationButtons } from './Authentication/AuthenticationButtons'

export default function LandingPage(props){
    return (
        <div>
            <h1>
                
            </h1>
            <div id="authenticationBtn">
                {authenticationButtons.loginRegisterButtons()}
            </div>
        </div>
    )
}