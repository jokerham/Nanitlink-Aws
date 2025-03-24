import { Box } from '@mui/material';
import { Field, FormikHandlers, useFormikContext } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { CKEditorConfig } from './config'
import { ClassicEditor } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

interface ICKEditorTemplateProps {
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

export const CKEditorTemplate = (props: ICKEditorTemplateProps) => {
  const { setFieldValue } = useFormikContext<unknown>();
  const { value, name, onChange } = props;
  const content = value;
  const setContent = (content: string) => {
    setFieldValue(name, content);
  };
  
  return (
    <Box sx={CKEditorBoxStyle}>
      <Field type='hidden' id={name} value={name} onChange={onChange}/>
      <CKEditor 
        id='editor'
        editor={ ClassicEditor }
        config={ CKEditorConfig }
        data={content}
        onReady={(editor) => {        
          const sourceEditing = editor.plugins.get('SourceEditing');
          
          // Listen for when source mode is activated
          sourceEditing.on('change:isSourceEditingMode', (eventInfo, name, value) => {
            console.log(eventInfo);
            console.log(name);
            console.log(value);
            if (value) {
              const container = document.querySelector('.ck-source-editing-area');
              if (container) {
                const textarea = container.querySelector('textarea');
                console.log(textarea);
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
        }}
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}
      />
    </Box>
  );
};