import React, { useState } from "react";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import BackDrop from "../common/BackDrop";
import SnackBar from "../common/SnackBar";
import { TIdeaDetail } from "../../model/idea.model";

import * as firebase from "firebase/app";
import { FirebaseContext } from "../../contexts/FirebaseContext";

const initialIdea = {
  user: "",
  title: "",
  description: "",
};

const AddIdea: React.FC<any> = ({ isOpen, handleOpenDialog }) => {
  const { user, database } = React.useContext(FirebaseContext);
  const [newIdea, setNewIdea] = useState<TIdeaDetail>(initialIdea);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(isOpen);

  const canSave = (): boolean => {
    return newIdea.title.length > 0 && newIdea.description.length > 0;
  };

  const saveIdea = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    handleOpenDialog(false);

    database
      .collection("ideas")
      .add({
        ...newIdea,
        user: user.authUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        setLoading(false);
        setShowSnackBar(true);
      })
      .catch(function (error: any) {
        console.error("Error adding a new idea: ", error);
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => handleOpenDialog(false)} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{"Add new idea"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id='title'
            label='title'
            onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
            autoComplete='off'
            fullWidth
          />
          <TextField
            id='description'
            label='description'
            onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
            multiline
            rows={6}
            autoComplete='off'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpenDialog(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={(e) => saveIdea(e)} color='primary' disabled={!canSave()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <BackDrop loading={loading} />
      <SnackBar showSnackBar={showSnackBar} setShowSnackBar={setShowSnackBar} message={"Success to add a new idea"} />
    </>
  );
};

export default AddIdea;