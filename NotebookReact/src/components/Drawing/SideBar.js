import {React} from 'react'
import { Button } from '@material-ui/core';
import {imageService} from '../../services/imageService'

export default function SideBar(){
    return (
        <Button variant="contained" color="primary" onClick={() => imageService.saveCanvas()}>
            Save
        </Button>
    )
}