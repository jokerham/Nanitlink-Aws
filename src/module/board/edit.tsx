import { useState, ComponentType, use, useEffect } from 'react';
import { EFieldType, EVariant, FormBuilder, TFieldSetting, TSection } from '@/component/formbuilder';
import { FormikHelpers, FormikValues } from 'formik';
import { useLocation, useNavigate } from 'react-router';
import { gqGetPost } from '@/function/amplify/graphql/post/gqGetPost';
import { CKEditorTemplate } from '@/component/CKEditorTemplate';
import { gqCreatePost, gqUpdatePost } from '@/function/amplify/graphql/post/gqUpdatePost';
import { gqGetCategoryByBoard } from '@/function/amplify/graphql/post/gqGetCategory';

interface IEditProps {
  id: string
}

const defaultInitialValues = {
  id: '',
  module: 'board',
  moduleId: '',
  categoryId: '',
  postIndex: 0,
  title: '',
  content: '',
  authorId: '',
  attachments: []
};


const initialSections = [
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

const Edit = ({id}: IEditProps) => {
  const [initialValues, setInitialValues] = useState<FormikValues>({...defaultInitialValues, moduleId: id});
  const [categories, setCategories] = useState<any[]>([]);
  const [sections, setSections] = useState(initialSections);
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const postId = params.get('postId');

  useEffect(() => {
    if (postId) {
      gqGetPost(postId).then((post) => {
        setInitialValues({
          ...defaultInitialValues,
          id: post.id,
          module: post.module,
          moduleId: post.moduleId,
          categoryId: post.categoryId,
          postIndex: post.postIndex,
          title: post.title,
          content: post.content,
          authorId: post.authorId,
          attachments: post.attachments.items
        });

        gqGetCategoryByBoard(post.moduleId).then((categories) => {
          setCategories(categories);
          if (categories.length > 0) {
            const categoryField: TFieldSetting = {type: EFieldType.Select, name: 'categoryId', label: 'Category', options: {
              data: categories.map((category: { name: any; id: any; }) => ({
                label: category.name, value: category.id
              }))}};
            const fields = initialSections[0].fields;
            const hasCategoryField = fields.some(field => field.name === 'categoryId');
            const newFields = hasCategoryField ? fields : [categoryField, ...fields];
            const newSection = [{ ...initialSections[0], fields: newFields }];
            setSections(newSection);
          }
        });
      })
    }
  }, [postId]);
  
  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    //console.log(values);
    if (values.id) {
      // update post
      const result = await gqUpdatePost({
        id: values.id,
        module: 'board',
        moduleId: id,
        postIndex: values.postIndex,
        title: values.title,
        content: values.content,
        categoryId: values.categoryId,
      });
      console.log(result);
      if (result) {
        navigate('/board/index/' + values.moduleId);
      }
    } else {
      // create post
      const result = await gqCreatePost({
        title: values.title,
        content: values.content,
        module: values.module,
        moduleId: values.moduleId,
        categoryId: values.category,
        attachments: values.attachments
      });
      if (result) {
        navigate('/board/index/' + values.moduleId);
      }
    }
  };
  
  return (
    <FormBuilder
      variant={EVariant.LabelOnLeft}
      formikConfig={{initialValues, onSubmit}}
      sections={sections}/>
  );
}

export default Edit;
