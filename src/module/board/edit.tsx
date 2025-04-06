import { useState, ComponentType } from 'react';
import { EFieldType, EVariant, FormBuilder, TSection } from '@/component/formbuilder';
import { FormikHelpers, FormikValues } from 'formik';
import { useLocation, useNavigate } from 'react-router';
import { gqGetPost } from '@/function/amplify/graphql/post/gqGetPost';
import { CKEditorTemplate } from '@/component/CKEditorTemplate';
import { gqCreatePost, gqUpdatePost } from '@/function/amplify/graphql/post/gqUpdatePost';

interface IEditProps {
  id: string
}

const defaultInitialValues = {
  id: '',
  module: 'board',
  moduleId: '',
  postIndex: 0,
  title: '',
  content: '',
  authorId: '',
  attachments: []
};

const Edit = ({id}: IEditProps) => {
  const [initialValues, setInitialValues] = useState<FormikValues>({...defaultInitialValues, moduleId: id});
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const postId = params.get('postId');


  if (postId) {
    gqGetPost(postId).then((post) => {
      setInitialValues({
        ...defaultInitialValues,
        id: post.id,
        module: post.module,
        moduleId: post.moduleId,
        postIndex: post.postIndex,
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        attachments: post.attachments.items
      });
    })
  }
  
  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    //console.log(values);
    if (values.id) {
      // update post
      const result = await gqUpdatePost({
        id: values.id,
        title: values.title,
        content: values.content
      });
      if (result) {
        navigate('/board/' + values.moduleId);
      }
    } else {
      // create post
      const result = await gqCreatePost({
        title: values.title,
        content: values.content,
        module: values.module,
        moduleId: values.moduleId,
        attachments: values.attachments
      });
      if (result) {
        navigate('/board/' + values.moduleId);
      }
    }
  };

  const sections = [
    {seq: 1, label: '', expanded: true, expandable: false, fields: [
      {type: EFieldType.TextField, name: 'title', label: 'Title'},
      { name: 'content', label: 'Content', type: EFieldType.Custom, options: {
              Component: CKEditorTemplate as ComponentType<unknown>} },
      {type: EFieldType.Hidden, name: 'module', label: 'Module'},
      {type: EFieldType.Hidden, name: 'moduleId', label: 'Module ID'},
      {type: EFieldType.Hidden, name: 'authorId', label: 'Author ID'},
      {type: EFieldType.File, name: 'attachments', label: 'Attachments'},
    ]}
  ] as TSection[];

  const formBuilderProps = {
    variant: EVariant.LabelOnLeft,
    formikConfig: { initialValues, onSubmit },
    sections
  }
  
  return (
    <FormBuilder {...formBuilderProps}/>
  );
}

export default Edit;
