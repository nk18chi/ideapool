import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const SnackBar: React.FC<any> = ({ showSnackBar, setShowSnackBar, message }) => {
  const handleSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
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
