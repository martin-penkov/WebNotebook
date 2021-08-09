import React, {useState} from 'react';
import { Editor } from '@tinymce/tinymce-react'; 

export default function NotebookContent() {
    const [content, setContent] = useState('');
    
    function handleEditorChange(e) {
        console.log(
          'Content was updated:',
          e.target.getContent()
        );
        setContent(e.target.getContent())
      }

    return(
        <Editor
            apiKey="fssrkjlgddz0ho02een48ed60hhru0qmjckb7ptahxv9j9w4"
            initialValue="<p>Initial content</p>"
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
    )
}