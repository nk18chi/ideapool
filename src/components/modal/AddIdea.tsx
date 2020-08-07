import React, { useState } from "react";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch, FormControlLabel } from "@material-ui/core";
import BackDrop from "../common/BackDrop";
import SnackBar from "../common/SnackBar";
import { TIdeaDetail } from "../../model/idea.model";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { addNewIdea } from "../../firebase/ideas";
import { TAddIdea } from "../../model/component.model";
import * as firebase from "firebase";

const initialIdea: TIdeaDetail = {
  title: "",
  description: "",
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
  isPrivate: false,
  user: "",
};

const AddIdea: React.FC<TAddIdea> = ({ isOpen, handleOpenDialog }) => {
  const { user } = React.useContext(FirebaseContext);
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

    addNewIdea({ ...newIdea, user: user.uid! }).then(() => {
      setLoading(false);
      setShowSnackBar(true);
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
          <FormControlLabel
            control={
              <Switch
                checked={newIdea.isPrivate}
                onChange={(e) => setNewIdea((prev) => ({ ...prev, isPrivate: e.target.checked }))}
                color='primary'
                name='checkedB'
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label='private'
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
