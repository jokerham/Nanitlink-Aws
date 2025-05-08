import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Comment } from '@/API';
import { LiaComment } from "react-icons/lia";
import { TiArrowBackOutline } from "react-icons/ti";
import { LuEraser } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { ColumnBox, RowBox } from '@/component/customMui';
import { Avatar, Box, Button } from '@mui/material';
import { gqListComments } from '@/function/amplify/graphql/post/gqListComments';
import theme from './theme'
import './style.scss';
import { getCurrentUser } from 'aws-amplify/auth';
import { getMemberDetail } from '@/function/amplify/rest/member';
import { CognitoUser } from '@/function/amplify/rest/member/types';

interface ICommentsProps {
  postId: string
}

type ExtendedComment = Comment & {
  author: string;
  editPermission: boolean;
};

const sampleComments: ExtendedComment[] = [
  {
    id: '1',
    content: 'This is a comment',
    authorId: 'XXXXX',
    postId: 'samplePostId',
    createdAt: '2021-01-01',
    __typename: 'Comment',
    updatedAt: '',
    author: 'guest',
    editPermission: false
  }
]

const Comments = ({postId}: ICommentsProps) => {
  const [comments, setComments] = useState<ExtendedComment[]>(sampleComments);
  const [signedInUser, setSignedInUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      getMemberDetail(user?.userId || '').then((cognitoUser) => {
        setSignedInUser(cognitoUser.user);
      }).catch((error) => {
        console.error('Error fetching member details:', error);
      });
    }).catch((error) => {
      console.error('Error fetching signed in user:', error);
    });
  }, []);

  useEffect(() => {
    const getAuthorNickName = async (authorId: string) => {
      const member = await getMemberDetail(authorId);
      return member.user?.nickName ?? 'guest';
    }

    const hasEditPermission = (authorId: string) => {
      console.log('signedInUser', signedInUser);
      if (signedInUser) {
        if (signedInUser.userGroups.includes('Admin')) 
          return true;
        else 
          return authorId === signedInUser.id;
      }
      return false;
    }
    
    (async () => {
      try {
        let comments = await gqListComments(postId);
        if (comments.length === 0) {
          comments = sampleComments;
        }
        const commentWithAuthorNickname: ExtendedComment[] = await Promise.all(
          comments.map(async (comment: Comment) => {
            const authorNickname = await getAuthorNickName(comment.authorId);
            const editPermission = hasEditPermission(comment.authorId);
            return {
              ...comment,
              author: authorNickname,
              editPermission
            };
          })
        );
        setComments(commentWithAuthorNickname);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    })();
  }, [signedInUser]);


  return (
    <ThemeProvider theme={theme}>
      <ColumnBox>
        <RowBox className="comment-row">
          <LiaComment />
          Comments
          <Box className="comment-count">{comments.length}</Box>
        </RowBox>
        { comments.map((comment) => (
          <RowBox className="comment-row" key={comment.id}>
            <Avatar className="comment-avatar" />
            <ColumnBox className="comment-author-column">
              <Box>{comment.author}</Box>
              <Box>{comment.createdAt}</Box>
            </ColumnBox>
            <ColumnBox className="comment-content-column">
              <Box>{comment.content}</Box>
              <Box className="comment-actions">
                <Button startIcon={<TiArrowBackOutline/>}>Comment</Button>
                {comment.editPermission && (
                  <>
                    <Button startIcon={<LuEraser/>}>Update</Button>
                    <Button startIcon={<RiDeleteBinLine/>}>Delete</Button>
                  </>
                )}
                <Button startIcon={<CiMenuKebab/>}>I want to</Button>
              </Box>
            </ColumnBox>
          </RowBox>
        ))}
      </ColumnBox>
    </ThemeProvider>
  );
}

export default Comments;
