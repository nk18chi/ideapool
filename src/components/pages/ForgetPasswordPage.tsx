import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Typography,
  CircularProgress,
  Grid,
  Container,
  TextField,
  Button,
} from "@material-ui/core";
import { StyleMainTitle, StyleInput, StyleSubmitButton, StyleCicularWrapper, StyleCicular } from "../style/Common.style";
import { resetPassword } from "../../firebase/auth";
import { jsx } from "@emotion/core";

/** @jsx jsx */

export const ForgetPasswordPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailVerifyDialog, setEmailVerifyDialog] = React.useState(false);

  const handleForgetPasswordSubmit = (e: any) => {
    e.preventDefault();
    setSubmitLoading(true);
    resetPassword(email)
      .then(() => {
        setEmailVerifyDialog(true);
      })
      .catch((error: any) => {
        console.error(error);
        setSubmitLoading(false);
      });
  };

  const handleCloseEmailVerifyDialog = () => {
    setEmailVerifyDialog(false);
    history.push("/login");
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' css={StyleMainTitle} align='center'>
        Forget Passoword
      </Typography>
      <Typography variant='subtitle1' gutterBottom align='center'>
        Please enter your registered email address. <br />
        You will get a email that has a URL to reset your password.
      </Typography>

      <form onSubmit={handleForgetPasswordSubmit}>
        <TextField css={StyleInput} required id='email' label='email' type='email' fullWidth onChange={(e) => setEmail(e.target.value)} />
        <Grid container direction='column' alignItems='center'>
          <Grid item xs={12} css={StyleCicularWrapper}>
            <Button css={StyleSubmitButton} variant='contained' color='primary' size='large' type='submit' disabled={submitLoading}>
              Send
            </Button>
            {submitLoading && <CircularProgress css={StyleCicular} size={24} />}
          </Grid>
        </Grid>
      </form>

      {/* email verify dialog */}
      <Dialog open={emailVerifyDialog} onClose={handleCloseEmailVerifyDialog}>
        <DialogTitle>{"Please confirm your email box"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We sent the mail having a reset password link to your email address. You can reset your password by following the mail.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmailVerifyDialog} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
