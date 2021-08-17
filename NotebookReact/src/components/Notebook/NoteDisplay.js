import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {notebookService} from '../../services/notebookService'
import ReactHtmlParser from 'react-html-parser'; 
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    deleteBtn: {
        backgroundColor: "#c44b3e",
        color: "#f5f5f5",
        marginLeft: "1rem"
    }
}))

export default function NoteDisplay() {
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

    function handleDelete(){

    }

    return (
        <div className="noteDetails">
            <div>
                {note !== null && ReactHtmlParser (note.content)}
            </div>
            <Button
                className={classes.deleteBtn + ' deleteBtn'}
                variant="contained"
                color="#c44b3e"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete()}
            >
                Delete
            </Button>
        </div>
    )
}