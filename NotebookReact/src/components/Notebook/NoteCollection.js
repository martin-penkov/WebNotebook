import { useEffect, useState} from 'react'
import {notebookService} from '../../services/notebookService'
import ReactHtmlParser from 'react-html-parser'; 
import { useHistory } from "react-router-dom";

export default function NoteCollection() {
    const [userNotes, setUserNotes] = useState([])
    let history = useHistory();

    async function userNoteSetter(){
        let data = await notebookService.getuserNotes()
        setUserNotes(data)
    }

    useEffect(() => {
        userNoteSetter()
    }, [])

    return (
        <div className="notesContainer">
            {userNotes.length !== 0 && userNotes.map((note) => (<div onClick={() => history.push(`/note/${note.id}`)} className="noteContainer">{ ReactHtmlParser (note.content) }</div>))}
        </div>
    )
}