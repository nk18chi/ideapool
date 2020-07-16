import React, { useState, useEffect, useContext } from "react";
import * as firebase from "firebase/app";
import { TextField, Dialog, DialogContent, DialogActions, Button, DialogContentText } from "@material-ui/core";
import BackDrop from "../common/BackDrop";
import SnackBar from "../common/SnackBar";
import { TIdeaDetail } from "../../model/idea.model";
import { FirebaseContext } from "../../contexts/FirebaseContext";

const DetailIdea: React.FC<any> = ({ isOpen, handleOpenDialog, ideaId }) => {
  const { database } = useContext(FirebaseContext);
  const [idea, setIdea] = useState<TIdeaDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(isOpen);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setIdea(null);
    if (!ideaId) {
      return;
    }
    database
      .collection("ideas")
      .doc(ideaId)
      .get()
      .then((doc: any) => {
        let data: any = doc.data();
        const getIdea: TIdeaDetail = { ...data };
        setIdea(getIdea);
        setLoading(false);
      });
  }, [database, ideaId]);

  const handleDeleteIdea = () => {
    database
      .collection("ideas")
      .doc(ideaId)
      .delete()
      .then(() => {
        setSnackBarMessage("Success to delete the idea");
        setShowSnackBar(true);
        handleOpenDialog(false);
      });
  };

  const handleUpdateIdea = () => {
    database
      .collection("ideas")
      .doc(ideaId)
      .set({ ...idea!, updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
      .then(() => {
        setSnackBarMessage("Success to update the idea");
        setShowSnackBar(true);
        handleOpenDialog(false);
      });
  };

  return (
    <>
      {isOpen &&
        (idea ? (
          <div>
            <Dialog open={isOpen} onClose={() => handleOpenDialog(false)} fullWidth={true} maxWidth={"sm"}>
              <DialogContent>
                <DialogContentText component={"div"}>
                  <TextField
                    autoFocus
                    id='title'
                    label='title'
                    value={idea.title}
                    onChange={(e) => setIdea({ ...idea, title: e.target.value })}
                    autoComplete='off'
                    fullWidth
                  />
                  <TextField
                    id='description'
                    label='description'
                    value={idea.description}
                    onChange={(e) => setIdea({ ...idea, description: e.target.value })}
                    multiline
                    rows={6}
                    autoComplete='off'
                    fullWidth
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions style={{ display: "block" }}>
                <Button variant='contained' onClick={handleDeleteIdea} color='secondary'>
                  Delete
                </Button>
                <Button variant='contained' onClick={handleUpdateIdea} color='primary' style={{ float: "right" }}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <BackDrop loading={loading} />
        ))}
      <SnackBar showSnackBar={showSnackBar} setShowSnackBar={setShowSnackBar} message={snackBarMessage} />
    </>
  );
};

export default DetailIdea;
