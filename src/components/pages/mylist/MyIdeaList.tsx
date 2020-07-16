import React, { useState, useContext } from "react";
import "./MyIdeaList.scss";
import { Card, CardContent, Typography, CardActions, Button, CircularProgress } from "@material-ui/core";
import DetailIdea from "../../modal/DetailIdea";
import { IdeaContext } from "../../../contexts/IdeaContext";

const MyIdeaList: React.FC = () => {
  const { ideaContext } = useContext<any>(IdeaContext);
  const [clickedIdea, setClickedIdea] = useState<string>("");
  const [openIdeaDetailDialog, setOpenIdeaDetailDialog] = useState<boolean>(false);

  const handleIdeaDetailDialog = (ableOpen: boolean) => {
    setOpenIdeaDetailDialog(ableOpen);
  };

  return (
    <>
      <h1>My Idea List</h1>
      {ideaContext.loading ? (
        <CircularProgress />
      ) : (
        <div className='idea-list'>
          {ideaContext.ideas && ideaContext.ideas.length > 0 ? (
            <>
              {ideaContext.ideas.map((idea: any) => (
                <Card key={idea.id} style={{ marginTop: 12, marginBottom: 12 }}>
                  <CardContent>
                    <Typography variant='h5' component='h2'>
                      {idea.title}
                    </Typography>
                    <Typography variant='body2' component='p'>
                      {idea.description}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ float: "right" }}>
                    <Button
                      size='small'
                      color='primary'
                      onClick={() => {
                        setOpenIdeaDetailDialog(true);
                        setClickedIdea(idea.id);
                      }}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              ))}
              <DetailIdea isOpen={openIdeaDetailDialog} handleOpenDialog={handleIdeaDetailDialog} ideaId={clickedIdea} />
            </>
          ) : (
            <p>no ideas</p>
          )}
        </div>
      )}
    </>
  );
};

export default MyIdeaList;
