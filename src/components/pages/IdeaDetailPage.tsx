import React, { useState, useEffect, Fragment } from "react";
import {
  Typography,
  Container,
  Divider,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Button,
  TextField,
  Grid,
  Paper,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { TIdeaDetail, TComment } from "../../model/idea.model";
import { jsx, css } from "@emotion/core";
import { StyleMainTitle } from "../style/Common.style";
import { getIdeaDetail, addCommentForIdea, getLatestCommentsForIdea } from "../../firebase/ideas";
import { TMatchProps } from "../../model/component.model";
import { Skeleton } from "@material-ui/lab/";
import { Color } from "../style/Color";
import * as firebase from "firebase";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { formatFirebaseDate } from "../../utils/functions";

/** @jsx jsx */

const StyleCommentTitle = css`
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  margin: 40px 0 16px;
`;

const StyleCommentButtonWrapper = css`
  text-align: right;
  margin: 4px 0px;
`;

const StyleCommentButton = css`
  background-color: #ffd31d;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  background-color: ${Color.MainColor};
  &:hover {
    background-color: ${Color.MainColor};
  }
`;

const StyleForMembersComponent = css`
  padding: 24px;
  border: 1px solid ${Color.LightGray};
`;

const initialComment: TComment = {
  description: "",
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
  user: {
    uid: "",
    displayName: "",
  },
};

export const IdeaDetailPage: React.FC<TMatchProps> = ({
  match: {
    params: { ideaId },
  },
}) => {
  const { user } = React.useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);
  const [idea, setIdea] = useState<TIdeaDetail | null>(null);
  const [newComment, setNewComment] = useState<TComment>(initialComment);
  const [comments, setComments] = useState<TComment[]>([]);

  useEffect(() => {
    if (user.loading || user.uid === null) return;
    setNewComment((prev) => ({ ...prev, user: { uid: user.uid!, displayName: user.displayName! } }));
  }, [user]);

  useEffect(() => {
    getIdeaDetail(ideaId).then((res) => {
      setIdea(res);
      setLoading(false);
    });

    const success = (newData: TComment[]) => {
      setComments(newData);
    };
    getLatestCommentsForIdea(ideaId, success);
  }, [ideaId]);

  const submmitNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCommentForIdea(ideaId, newComment);
    setNewComment({ ...newComment, description: "" });
  };

  return (
    <Container maxWidth='md'>
      {user.loading || loading ? (
        <Fragment>
          <Typography variant='h1' css={StyleMainTitle} align='center'>
            <Skeleton />
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {Array(5)
              .fill(1)
              .map((_, i) => (
                <Skeleton key={i} />
              ))}
            <Skeleton width='70%' />
          </Typography>
        </Fragment>
      ) : (
        <Fragment>
          <Typography variant='h1' css={StyleMainTitle} align='center'>
            {idea!.title}
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {idea!.description}
          </Typography>

          <Typography variant='h2' css={StyleCommentTitle} align='center'>
            comments
          </Typography>

          {user.uid ? (
            <form onSubmit={submmitNewComment}>
              <TextField
                id='new-comment'
                label='New Comment'
                multiline
                rows={4}
                variant='outlined'
                fullWidth
                value={newComment.description}
                onChange={(e) => setNewComment({ ...newComment, description: e.target.value })}
              />
              <Grid item xs={12} css={StyleCommentButtonWrapper}>
                <Button variant='contained' css={StyleCommentButton} type='submit'>
                  Post
                </Button>
              </Grid>
            </form>
          ) : (
            <Paper elevation={0} css={StyleForMembersComponent}>
              <Typography component='p' variant='subtitle1' color='textPrimary' align='center'>
                <Link component={RouterLink} to='/login'>
                  Login
                </Link>{" "}
                or{" "}
                <Link component={RouterLink} to='/signup'>
                  Signup
                </Link>{" "}
                to comment
              </Typography>
            </Paper>
          )}
        </Fragment>
      )}
      <List>
        {comments &&
          comments.map((comment) => (
            <Fragment key={comment.id}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt='' src='' />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Fragment>
                      <Typography component='span' variant='body2' color='textPrimary'>
                        {formatFirebaseDate(comment.createdAt)}
                      </Typography>
                      {" - "}
                      <Typography component='span' variant='body2' color='textPrimary'>
                        {comment.user?.displayName}
                      </Typography>
                    </Fragment>
                  }
                  secondary={
                    <Typography component='span' variant='subtitle1' color='textPrimary'>
                      {comment.description}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </Fragment>
          ))}
      </List>
    </Container>
  );
};
