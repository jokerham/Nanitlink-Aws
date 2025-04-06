import { Post } from "@/API";
import Loading from "@/component/commom/Loading";
import { ColumnBox, RowBox } from "@/component/customMui";
import { gqGetPost } from "@/function/amplify/graphql/post/gqGetPost";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TfiUser } from "react-icons/tfi";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Link } from "react-router-dom";

interface IDetailProps {
  id: string
}

type IPostExtend = Post & { author: string };

export const formatAwsTimestamp = (timestamp?: string): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const Detail = ({id}: IDetailProps) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<IPostExtend | undefined>(undefined);

  useEffect(() => {
    gqGetPost(id).then((post) => {
      setPost(post);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, [id]);

  return (
    <Loading loading={loading}>
      <ThemeProvider theme={theme}>
        <ColumnBox>
          <Typography variant="h2">{post?.title} </Typography>
          <RowBox sx={{gap: 2}}>
            <RowBox>
              <TfiUser />
              <Typography variant="h6">
                {post?.author}
              </Typography>
            </RowBox>
            <RowBox>
              <FaRegClock />
              <Typography variant="h6">
                {formatAwsTimestamp(post?.createdAt)}
              </Typography>
            </RowBox>
            <RowBox>
              <MdOutlineRemoveRedEye />
              <Typography variant="h6">
                {post?.views}
              </Typography>
            </RowBox>
          </RowBox>
          <Divider />
          <Box dangerouslySetInnerHTML={{ __html: post?.content || '' }} />
          <RowBox>
            <Button component={Link} to={`/board/${post?.moduleId}`} size="small" startIcon={<CiViewList />} color="inherit">List</Button>
          </RowBox>
          <Divider />
        </ColumnBox>
      </ThemeProvider>
    </Loading>
  );
}

export default Detail;
