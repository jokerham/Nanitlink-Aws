import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material';
import { RowBox, ColumnBox } from 'component/customMui';
import { Link } from 'react-router';
import AdminAuthorized from 'component/amplify/AdminAuthorized';
import { useEffect, useState } from 'react';
import { gqGetArticleWithPost } from 'function/amplify/graphql/post/gqGetPost';
import Loading from 'component/commom/Loading';
import { IArticle } from './type';

interface IViewProps {
  id: string
}

const View = ({id}: IViewProps) => {
  const [article, setArticle] = useState<IArticle | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gqGetArticleWithPost(id).then(article => {
      setArticle(article);
      setLoading(false);
    })
  }, [id]);

  return (
    <Loading loading={loading}>
      <ThemeProvider theme={theme}>
        <ColumnBox>
          <Box>
            <Typography>
              {article?.post?.title}
            </Typography>
            <Divider/>
            {article?.post?.content}
          </Box>
          <RowBox sx={{justifyContent: 'flex-end', width: '100%'}}>
            <ButtonGroup variant="contained">
              <AdminAuthorized>
                <Button component={Link} to={`/Article/configure/${id}`}>Configure</Button>
              </AdminAuthorized>
              <Button component={Link} to={`/Article/edit/${id}`}>Modify</Button>
            </ButtonGroup>
          </RowBox>
        </ColumnBox>
      </ThemeProvider>
    </Loading>
  );
}

export default View;
