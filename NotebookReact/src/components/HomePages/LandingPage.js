import React from 'react'
import { authenticationButtons } from '../Authentication/AuthenticationButtons'
import GitHubIcon from '@material-ui/icons/GitHub';

export default function LandingPage(props){
    return (
        <div id="gradientImage">
            <body id="container home">
                <div className="landingPageInner">
                    <div id="landingPageBg">
                        <h1>Your digital diary</h1>
                        <p>Organise your daily tasks<br/>Increase your productivity</p>
                        <div className="hero-btns">
                            {authenticationButtons.loginRegisterButtons()}
                        </div>
                    </div>
                </div>
            </body>
            <div className="footer">
                <a href="https://github.com/martin-penkov/WebNotebook">
                    <GitHubIcon className="githubIcon"></GitHubIcon>
                </a>
            </div>
        </div>
    )
}




