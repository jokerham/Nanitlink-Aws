import { Box } from '@mui/material';
import { Field, FormikHandlers, useFormikContext } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { CKEditorConfig } from './config'
import { CKEditorConfig as CKEditorConfigComment } from './commentConfig'
import { ClassicEditor, BalloonEditor } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

export enum ECkEditorTemplateVariant {
  Post,
  Comment,
}

interface ICKEditorTemplateProps {
  variant?: ECkEditorTemplateVariant;
  value: string;
  name: string;
  onChange: FormikHandlers['handleChange']
}

const CKEditorBoxStyle = {
  marginBottom: '-10px',
  padding: 0,
  height: '450px',
  width: '100%',
  '& .ck-editor__editable_inline': {
    height: '400px',
    overflowY: 'auto',
  },
  '& .ck-source-editing-area': {
    height: '400px',
    '& textarea': {
      height: '400px',    
    }
  } 
}

const CKEditorCommentBoxStyle = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: 0,
  height: '100px',
  width: '100%',
  '& .ck-editor__editable_inline': {
    height: '100px',
    overflowY: 'auto',
  },
  '& .ck-source-editing-area': {
    height: '100px',
    '& textarea': {
      height: '100px',    
    }
  } 
}

export const CKEditorTemplate = (props: ICKEditorTemplateProps) => {
  const { setFieldValue } = useFormikContext<unknown>();
  const { value: content, name, onChange } = props;
  const setContent = (content: string) => {
    setFieldValue(name, content);
  };
  const isPost = (props.variant ?? ECkEditorTemplateVariant.Post) === ECkEditorTemplateVariant.Post; ;
  const config = isPost ? CKEditorConfig : CKEditorConfigComment;
  const editor: any = isPost ? ClassicEditor: BalloonEditor;

  return (
    <Box sx={isPost ? CKEditorBoxStyle : CKEditorCommentBoxStyle}>
      <Field type='hidden' id={name} value={name} onChange={onChange}/>
      <CKEditor 
        id='editor'
        editor={ editor }
        config={ config }
        data={ content }
        onReady={(editor) => {        
          const sourceEditing = editor.plugins.get('SourceEditing');
          
          if (sourceEditing) {
            // Listen for when source mode is activated
            sourceEditing.on('change:isSourceEditingMode', (eventInfo, name, value) => {
              // console.log(eventInfo);
              // console.log(name);
              // console.log(value);
              if (value) {
                const container = document.querySelector('.ck-source-editing-area');
                if (container) {
                  const textarea = container.querySelector('textarea');
                  //console.log(textarea);
                  if (textarea) {
                    textarea.addEventListener('blur', () => {
                      sourceEditing.updateEditorData(); // Sync changes
                      setContent(editor.getData());
                    });
                  }
                }
              } else {
                console.log('Source editing mode is disabled');
              }
            });
          }

          // const modelDocument = editor.model.document;

          // modelDocument.on('change:data', () => {
          //   setContent(editor.getData());
          // });
        }}
        onChange={(event, editor) => {
          //console.log('Editor data changed:', editor.getData());
          setContent(editor.getData());
        }}
      />
    </Box>
  );
};