import { useEffect, useState } from 'react';
import { gqGetArticleWithPost } from '@/function/amplify/graphql/post/gqGetPost';
import { IArticle } from './type';
import { Box, Divider, ThemeProvider, Typography } from '@mui/material';
import Loading from '@/component/commom/Loading';
import { ColumnBox } from '@/component/customMui';
import theme from './theme';
import { EFieldType, EVariant, FormBuilder, TSection } from '@/component/formbuilder';
import { FormikConfig, FormikValues } from 'formik';
import { CKEditorTemplate } from '@/component/CKEditorTemplate';
import { gqUpdatePost } from '@/function/amplify/graphql/post/gqUpdatePost';
import { useNavigate } from 'react-router';

interface IEditProps {
  id: string;
}

const initialFormikConfig = {
  initialValues: {},
  onSubmit: (values: FormikValues) => {}
}

const Edit = ({id}: IEditProps) => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<IArticle | undefined>(undefined);
  const [formikConfig, setFormikConfig] = useState<FormikConfig<FormikValues>>(initialFormikConfig);
  const navigate = useNavigate();

  const onSubmitHandler = async (values: FormikValues) => {
    const updateValues = {
        module: 'article',
        moduleId: id,
        postIndex: 1,
        id: values.id,
        title: values.title,
        content: values.content
    };
    await gqUpdatePost(updateValues);
    navigate(`/Article/index/${article?.id}`);
  }

  useEffect(() => {
    gqGetArticleWithPost(id).then(article => {
      setArticle(article);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    setFormikConfig({
      initialValues: {
        id: article?.post?.id ?? '',
        title: article?.post?.title ?? '',
        content: article?.post?.content ?? ''
      },
      onSubmit: onSubmitHandler})
  }, [article]);

  const sections: TSection[] = [{
    seq: 1,
    fields: [
      { name: 'id', label: 'id', type: EFieldType.Hidden },
      { name: 'title', label: 'Title', type: EFieldType.TextField, required: true }, 
      { name: 'content', label: 'Content', type: EFieldType.Custom, options: {
        Component: CKEditorTemplate as React.ComponentType<unknown>} }
    ]
  }];
  
  return (
    <Loading loading={loading}>
      <ThemeProvider theme={theme}>
        <ColumnBox>
          <Box>
            <Typography>
              {article?.name}
            </Typography>
            <Divider/>
            <FormBuilder
              variant={EVariant.Default}
              formikConfig={formikConfig}
              sections={sections}/>
          </Box>
        </ColumnBox>
      </ThemeProvider>
    </Loading>
  );
}

export default Edit;
