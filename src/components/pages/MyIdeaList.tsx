import React, { useState, useContext, Fragment } from "react";
import { Typography, CircularProgress, Grid, Container, List, Divider, ListItem, ListItemText } from "@material-ui/core";
import DetailIdea from "../modal/DetailIdea";
import { IdeaContext } from "../../contexts/IdeaContext";
import { TIdeaContext } from "../../model/idea.model";
import { jsx } from "@emotion/core";
import { StyleMainTitle } from "../style/Common.style";
import { formatFirebaseDate, trimText } from "../../utils/functions";

/** @jsx jsx */

const MyIdeaList: React.FC = () => {
  const ideaContext = useContext<TIdeaContext>(IdeaContext);
  const [clickedIdea, setClickedIdea] = useState<string>("");
  const [openIdeaDetailDialog, setOpenIdeaDetailDialog] = useState<boolean>(false);

  return (
    <Container maxWidth='md'>
      <Typography variant='h1' css={StyleMainTitle} align='center'>
        My Idea List
      </Typography>
      <Grid container direction='column' alignItems='center'>
        {ideaContext.loading ? (
          <CircularProgress />
        ) : ideaContext.ideas && ideaContext.ideas.length > 0 ? (
          <List>
            {ideaContext.ideas.map((idea) => (
              <Fragment key={idea.id}>
                <ListItem
                  button
                  alignItems='flex-start'
                  onClick={() => {
                    setOpenIdeaDetailDialog(true);
                    setClickedIdea(idea.id);
                  }}
                >
                  <ListItemText
                    primary={idea.title}
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
                <Divider variant='inset' component='li' />
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
