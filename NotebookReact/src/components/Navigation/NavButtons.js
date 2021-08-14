import { Button } from '@material-ui/core';
import {imageService} from '../../services/imageService'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

let homeButtons = 
    <div id="navButtons">
        <Button variant="outlined" color="inherit" component={Link} to="/canvas">
            Draw
        </Button>
        <Button variant="outlined" color="inherit" component={Link} to="/note">
            Notes
        </Button>
    </div>

let canvasButtons = 
    <div id="navButtons"> 
        <Button variant="contained" color="primary" onClick={() => imageService.saveCanvas()}>
            Save
        </Button>
    </div>

export default function NavButtons(props){
    const [componentName, setComponentName] = useState(window.location.pathname)
    const [returnComponent, setReturnComponent] = useState(homeButtons)

    useEffect(() => {
        
        setComponentName(window.location.pathname)
    }, [])


    switch (window.location.pathname) {
        case "/canvas":
            return canvasButtons
        case "/":
            console.log(window.location.pathname)
            return homeButtons
    }
}