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
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";
import DeleteConfirmDialog from "@/component/dialog/deleteConfirmDialog";
import { deleteBoardPost } from "@/function/amplify/rest/board";
import Comments from "../post/comments";

interface IDetailProps {
  id: string
  currentPage?: number
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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const searchParam = new URLSearchParams(window.location.search);
  const currentPage = searchParam.get('currentPage') ? parseInt(searchParam.get('currentPage') || '1') : 1;
  const navigate = useNavigate();

  useEffect(() => {
    gqGetPost(id, true).then((post) => {
      setPost(post);
      setLoading(false);
      getCurrentUser().then((user) => {
        setEditable(post.authorId === user?.userId);
      });
    }).catch((error) => {
      setLoading(false);
    });
  }, [id]);

  const onDeleteCancel = () => { setDeleteOpen(false); };
  const onDeleteConfirm = async () => {
    setDeleteOpen(false);
    // Call delete API here
    const response = await deleteBoardPost({boardId: post?.moduleId || '', postId: post?.id || ''});
    // After delete, navigate to the list page
    if (response) {
      navigate(`/board/${post?.moduleId}?page=${currentPage}`);
    }
  }

  return (
    <Loading loading={loading}>
      <ThemeProvider theme={theme}>
        <ColumnBox>
          <RowBox>
            {post?.category?.id && (
              <>
                <Typography variant="h2">
                  {post.category.name}
                </Typography>
                <Divider orientation="vertical" flexItem />
              </>
            )}
            <Typography variant="h2">
              {post?.title}
            </Typography>
          </RowBox>
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
          <RowBox sx={{justifyContent: 'space-between'}}>
            <Button component={Link} to={`/board/${post?.moduleId}?page=${currentPage}`} size="small" startIcon={<CiViewList />} color="inherit">List</Button>
            {editable && (
            <RowBox sx={{gap: 1}}>
              <Button component={Link} to={`/board/edit/${post?.moduleId}?postId=${id}&page=${currentPage}`} size="small" color="inherit">Edit</Button>
              <Button size="small" color="inherit" onClick={() => setDeleteOpen(true)}>Delete</Button>
            </RowBox>
            )}
          </RowBox>
        </ColumnBox>
      </ThemeProvider>
      <Divider sx={{my: 2}}/>
      <Comments postId={id} />
      <DeleteConfirmDialog
        open={deleteOpen}
        item={post?.title || ''}
        onCancel={onDeleteCancel}
        onConfirm={onDeleteConfirm} />
    </Loading>
  );
}

export default Detail;
