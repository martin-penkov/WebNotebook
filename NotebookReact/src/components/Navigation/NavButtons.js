import { Button } from '@material-ui/core';
import {imageService} from '../../services/imageService'
import { Link, useLocation } from 'react-router-dom'

export default function NavButtons(props){
    let location = useLocation();
    switch(location.pathname){
        case('/canvas'):
            return (<Button variant="contained" color="primary" onClick={() => imageService.saveCanvas()}>
                Save
                </Button>)
        default:
                return (
                <div>
                <Button variant="outlined" color="inherit" component={Link} to="/canvas">
                    Draw
                </Button>
                <Button variant="outlined" color="inherit" component={Link} to="/note">
                    Notes
                </Button></div>)
    }
}