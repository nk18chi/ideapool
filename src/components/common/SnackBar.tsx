import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { TSnacBar } from "../../model/component.model";

const SnackBar: React.FC<TSnacBar> = ({ showSnackBar, setShowSnackBar, message }) => {
  const handleSnackBar = (_: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackBar(false);
  };

  return (
    <Snackbar open={showSnackBar} autoHideDuration={3000} onClose={handleSnackBar} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <MuiAlert elevation={6} variant='filled' onClose={handleSnackBar} severity='success'>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
