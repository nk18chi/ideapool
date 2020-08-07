import React, { useState, useContext, Fragment } from "react";
import { Typography, Grid, Container, List, Divider, ListItem, ListItemText } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab/";
import DetailIdea from "../modal/DetailIdea";
import { IdeaContext } from "../../contexts/IdeaContext";
import { TIdeaContext, TIdeaList } from "../../model/idea.model";
import { jsx, css } from "@emotion/core";
import { StyleMainTitle } from "../style/Common.style";
import { formatFirebaseDate, trimText } from "../../utils/functions";

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

const MyIdeaList: React.FC = () => {
  const ideaContext = useContext<TIdeaContext>(IdeaContext);
  const [clickedIdea, setClickedIdea] = useState<string>("");
  const [openIdeaDetailDialog, setOpenIdeaDetailDialog] = useState<boolean>(false);

  console.log(ideaContext);
  return (
    <Container maxWidth='md'>
      <Typography variant='h1' css={StyleMainTitle} align='center'>
        My Idea List
      </Typography>
      <Grid container direction='column' alignItems='center'>
        {ideaContext.loading ? (
          <List
            css={css`
              width: 100%;
            `}
          >
            {Array(5)
              .fill(1)
              .map(() => (
                <ListItem alignItems='flex-start'>
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
        ) : ideaContext.ideas && ideaContext.ideas.length > 0 ? (
          <List>
            {ideaContext.ideas.map((idea: TIdeaList) => (
              <Fragment key={idea.id!}>
                <ListItem
                  button
                  alignItems='flex-start'
                  onClick={() => {
                    setOpenIdeaDetailDialog(true);
                    setClickedIdea(idea.id!);
                  }}
                >
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
            <DetailIdea isOpen={openIdeaDetailDialog} handleOpenDialog={setOpenIdeaDetailDialog} ideaId={clickedIdea} />
          </List>
        ) : (
          <Typography component='p' variant='h6' gutterBottom color='textSecondary'>
            You haven't added ideas yet.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default MyIdeaList;
