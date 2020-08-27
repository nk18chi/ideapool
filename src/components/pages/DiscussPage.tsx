import React, { useState, useEffect, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Grid, Container, List, Divider, ListItem, ListItemText } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab/";
import { TIdeaList } from "../../model/idea.model";
import { jsx, css } from "@emotion/core";
import { StyleMainTitle } from "../style/Common.style";
import { formatFirebaseDate, trimText } from "../../utils/common.functions";
import { getLatestIdeaList } from "../../firebase/ideas";

/** @jsx jsx */

const styledIdeaTitle = css`
  margin: 4px 0;
  font-size: 20px;
  font-weight: 600;
`;

const styledIdeaPrivateChip = css`
  background-color: #ffd31d;
  color: #fff;
  padding: 7px;
  font-size: 12px;
  border-radius: 11px;
  margin-right: 12px;
  vertical-align: middle;
  font-weight: 600;
`;

export const DiscussPage: React.FC = () => {
  const [ideas, setIdeas] = useState<TIdeaList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getLatestIdeaList().then((res) => {
      setIdeas(res);
      setLoading(false);
    });
  }, []);

  return (
    <Container maxWidth='md'>
      <Typography variant='h1' css={StyleMainTitle} align='center'>
        Dicuss
      </Typography>
      <Grid container direction='column' alignItems='center'>
        {loading ? (
          <List
            css={css`
              width: 100%;
            `}
          >
            {Array(5)
              .fill(1)
              .map((_, i) => (
                <ListItem key={i} alignItems='flex-start'>
                  <ListItemText
                    primary={
                      <h2 css={styledIdeaTitle}>
                        <Skeleton />
                      </h2>
                    }
                    secondary={
                      <Typography component='span' variant='body2' color='textSecondary'>
                        <Skeleton width='100%' />
                        <Skeleton width='80%' />
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
          </List>
        ) : ideas && ideas.length > 0 ? (
          <List
            css={css`
              width: 100%;
            `}
          >
            {ideas.map((idea: TIdeaList) => (
              <Fragment key={idea.id!}>
                <ListItem button alignItems='flex-start' component={RouterLink} to={`/discuss/${idea.id}`}>
                  <ListItemText
                    primary={
                      <h2 css={styledIdeaTitle}>
                        {idea.isPrivate && (
                          <Typography css={styledIdeaPrivateChip} variant='button' component='span'>
                            PRIVATE
                          </Typography>
                        )}
                        {idea.title}
                      </h2>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component='span' variant='body2' color='textPrimary'>
                          {formatFirebaseDate(idea.updatedAt)}
                        </Typography>
                        <Typography component='span' variant='body2' color='textSecondary'>
                          {" — "}
                          {trimText(idea.description, 240)}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider
                  variant='inset'
                  component='li'
                  css={css`
                     {
                      margin-left: 0;
                    }
                  `}
                />
              </Fragment>
            ))}
          </List>
        ) : (
          <Typography component='p' variant='h6' gutterBottom color='textSecondary'>
            We don't have any ideas...
          </Typography>
        )}
      </Grid>
    </Container>
  );
};
