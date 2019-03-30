
import { Editor } from '@tinymce/tinymce-react';
import * as React from 'react';


interface IProps {
    initialValue: string;
    value: string;
    editorContentOnChange: (content: string) => void;
    uploadImage: (blobInfo: any, success: any, failure: any) => void;
}

const editor = (props: IProps) => {
    return (<Editor
        key='tiny-cai-mce'
        value={props.initialValue}
        initialValue={props.initialValue}
        init={{
            height: 800,
            autoresize_min_height: 800,
            menubar: false,
            paste_data_images: true,
            fontsize_formats: "8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 24pt 36pt",
            plugins: 'link image lists preview code imagetools table paste textcolor colorpicker autoresize',
            toolbar: 'formatselect | fontsizeselect |  forecolor | table | undo redo | bold italic | alignleft aligncenter alignright | removeformat',
            file_browser_callback_types: "image media",
            images_upload_handler: props.uploadImage
        }}
        onChange={(e) => props.editorContentOnChange(e.level.content)}
    />);
}

export default editor;