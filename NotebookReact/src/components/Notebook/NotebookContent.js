import React, {useState} from 'react';
import { Editor } from '@tinymce/tinymce-react'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import {Button} from '@material-ui/core'
import {notebookService} from '../../services/notebookService'



export default function NotebookContent() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    
    function handleEditorChange(e) {
        console.log(
          'Content was updated:',
          e.target.getContent()
        );
        setContent(e.target.getContent())
      }

    return(
        <div className="editorContainer">
            {loading && <CircularProgress size={60} color="primary" className="editorLoading"></CircularProgress>}
            <Editor
                apiKey="fssrkjlgddz0ho02een48ed60hhru0qmjckb7ptahxv9j9w4"
                onInit={() => { setLoading(false); }}
                initialValue=""
                init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image', 
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help'
                }}
                onChange={handleEditorChange}
            />
            <Button className={(loading && 'hideBtn') + ' alignButton'} variant="contained" color={"secondary"} onClick={() => notebookService.createNote(content)}>
                Save
            </Button>
        </div>
    )
}