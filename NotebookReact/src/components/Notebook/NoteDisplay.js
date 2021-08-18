import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {notebookService} from '../../services/notebookService'
import ReactHtmlParser from 'react-html-parser'; 
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles(theme => ({
    deleteBtn: {
        backgroundColor: "#c44b3e",
        color: "#f5f5f5",
        marginLeft: "1rem"
    }
}))

export default function NoteDisplay() {
    const [openDialog, setOpenDialog] = useState(false)
    const classes = useStyles();
    const { id } = useParams()
    const [note, setNote] = useState(null)

    async function getNote(){
        let data = await notebookService.getNote(id)
        setNote(data)
    }

    useEffect(() => {
        getNote()
    }, [])

    async function handleDelete(id){
        notebookService.deleteNote(id)
    }

    return (
        <div className="noteDetails">
            <div className="noteContent">
                {note !== null && ReactHtmlParser (note.content)}
            </div>
            <div className={"noteInformation"}>
            <Button
                className={classes.deleteBtn + ' deleteBtn'}
                variant="contained"
                color="#c44b3e"
                startIcon={<DeleteIcon />}
                onClick={() => {
                    handleDelete(note.id)
                    setOpenDialog(true)
                    setTimeout(() => setOpenDialog(false), 2000)
                }}
            >
                Delete<Dialog open={openDialog} aria-labelledby="simple-dialog-title">
    <DialogTitle id="simple-dialog-title">Note successfully deleted!</DialogTitle>
</Dialog>
            </Button>
            <h4>{note !== null && "Date Created: " + note.dateCreated.substring(0, 10)}</h4>
            </div>
        </div>
    )
}