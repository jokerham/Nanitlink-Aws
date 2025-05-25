import { ComponentType, Fragment, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Comment } from '@/API';
import { ColumnBox, RowBox } from '@/component/customMui';
import { Avatar, Box, Button, Divider } from '@mui/material';
import { getMemberDetail } from '@/function/amplify/rest/member';
import { useAuth } from '@/component/commom/AuthContext';
import { gqListComments } from '@/function/amplify/graphql/post/gqListComments';
import { LiaComment } from "react-icons/lia";
import { TiArrowBackOutline } from "react-icons/ti";
import { LuEraser } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { CKEditorTemplate, ECkEditorTemplateVariant } from '@/component/CKEditorTemplate';
import { FormikConfig, FormikHandlers, FormikValues } from 'formik';
import { EFieldType, EVariant, FormBuilder, TSection } from '@/component/formbuilder';
import { gqAddComment } from '@/function/amplify/graphql/post/gqAddComment';
import { showToast } from '@/function/showToast';
import { formatAwsTimestamp } from "@/function/amplify/formatPostDate";
import theme from './theme'
import './style.scss';
import { gqDeleteComment } from '@/function/amplify/graphql/post/gqDeleteComment';
import DeleteConfirmDialog from '@/component/dialog/deleteConfirmDialog';

interface ICommentsProps {
  postId: string
}

type ExtendedComment = Comment & {
  author: string;
  editPermission: boolean;
};

const Comments = ({postId}: ICommentsProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<ExtendedComment[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);

  const getAuthorNickName = async (authorId: string) => {
    const member = await getMemberDetail(authorId);
    return member.user?.nickName ?? 'guest';
  }

  const hasEditPermission = (authorId: string) => {
    if (user) {
      if (user.userGroups.includes('Admin')) 
        return true;
      else 
        return authorId === user.id;
    }
    return false;
  }
  
  useEffect(() => {
    const fetchComments = async () => {
      const comments = await gqListComments(postId);
      //console.log(comments);
      const extendedComments: ExtendedComment[] = await Promise.all(
        comments.map(async (comment: Comment) => {
          const author = await getAuthorNickName(comment.authorId);
          const editPermission = hasEditPermission(comment.authorId);
          return {
            ...comment,
            author,
            editPermission
          }
        })
      );
      //console.log(extendedComments);
      setComments(extendedComments);
    }


    gqListComments(postId).then(() => {
      fetchComments();
    });

    fetchComments();
  }, [postId]);

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      postId,
      content: '',
    },
    onSubmit: (values) => {
      if (!user) {
        showToast('Please login to comment', 'error');
        return;
      }

      const commentItem = {
        postId: values.postId,
        content: values.content,
        authorId: user.id,
      }

      gqAddComment(commentItem).then((res => {
        if (res) {
          setComments((prevComments) => [
            ...prevComments,
            res
          ]);
        }
      }))
    },
  }
  
  const sections: TSection[] = [
    {
      seq: 0,
      fields: [
        { name: 'postId', label: 'Post ID', type: EFieldType.Hidden },
        { name: 'content', label: 'Content', type: EFieldType.Custom, options: {
          Component: CKEditorTemplate as ComponentType<unknown>,
          componentPros: { variant: ECkEditorTemplateVariant.Comment }
        } },
      ]
    }
  ]

  const onDeleteComment = (commentId: string) => {
    gqDeleteComment(commentId).then((res) => {
      if (res) {
        setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
        showToast('Comment deleted successfully', 'success');
      }
    });
  }

  const deleteCommentContent = deleteCommentId
    ? (comments.find(c => c.id === deleteCommentId)?.content.replace(/<[^>]+>/g, '') ?? '')
    : '';

  return (
    <ThemeProvider theme={theme}>
      <ColumnBox>
        <RowBox className="comment-row">
          <LiaComment />
          Comments
          <Box className="comment-count">{comments.length}</Box>
        </RowBox>
        { comments.map((comment, index) => (
          <Fragment key={index}>
            <RowBox className="comment-row" key={comment.id}>
              <Avatar className="comment-avatar" />
              <ColumnBox className="comment-author-column">
                <Box className="comment-author">{comment.author}</Box>
                <Box className="comment-created-at">{formatAwsTimestamp(comment.createdAt)}</Box>
              </ColumnBox>
              <ColumnBox className="comment-content-column">
                <Box dangerouslySetInnerHTML={{ __html: comment.content || '' }} className="comment-content" />
                <Box className="comment-actions">
                  <Button startIcon={<TiArrowBackOutline/>}>Comment</Button>
                  {comment.editPermission && (
                    <>
                      <Button startIcon={<LuEraser/>}>Update</Button>
                      <Button 
                        startIcon={<RiDeleteBinLine/>}
                        onClick={() => { 
                          setDeleteCommentId(comment.id);
                          setOpenDeleteDialog(true)
                        }} >
                        Delete
                      </Button>
                    </>
                  )}
                  <Button startIcon={<CiMenuKebab/>}>I want to</Button>
                </Box>
              </ColumnBox>
            </RowBox>
            {index < comments.length - 1 && <Divider />}
          </Fragment>
        ))}
        <FormBuilder variant={EVariant.SmallSize} formikConfig={formikConfig} sections={sections}/>
      </ColumnBox>
      <DeleteConfirmDialog
        open={openDeleteDialog}
        item={deleteCommentContent}
        onCancel={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          if (deleteCommentId) {
            onDeleteComment(deleteCommentId);
          }
          setOpenDeleteDialog(false);
        }}
      />
    </ThemeProvider>
  );
}

export default Comments;
