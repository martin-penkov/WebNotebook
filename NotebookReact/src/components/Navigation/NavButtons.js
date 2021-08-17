import { Button } from '@material-ui/core';
import {useState} from 'react'
import {imageService} from '../../services/imageService'
import { Link, useLocation } from 'react-router-dom'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';


export default function NavButtons(props){
    const [openDialog, setOpenDialog] = useState(false)
    const theme = useTheme();

    let location = useLocation();
    switch(location.pathname){
        case('/canvas'):
            return (<Button variant="contained" color={theme.palette.primary.main} onClick={() => {
                imageService.saveCanvas()
                setOpenDialog(true)
                setTimeout(() => setOpenDialog(false), 2500)
                }}>
                Save<Dialog open={openDialog} aria-labelledby="simple-dialog-title">
    <DialogTitle id="simple-dialog-title">Image successfully saved!</DialogTitle>
</Dialog>
                </Button>)
                
        case('/notes'):
                return (
                <div>
                <Button variant="contained" color="primary" component={Link} to="/note">
                    Write
                </Button></div>)
        default:
            return <div></div>
    }
}