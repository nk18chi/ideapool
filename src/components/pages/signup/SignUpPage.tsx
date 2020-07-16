import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "./SignUpPage.scss";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import Document from "../static/Document";
import { FirebaseContext } from "../../../contexts/FirebaseContext";

const termFilePath = require("../../../doc/TermsOfService.md");
const privacyFilePath = require("../../../doc/PrivacyPolicy.md");

const SignUpPage: React.FC = (props: any) => {
  const { auth } = React.useContext(FirebaseContext);
  const [emailVerifyDialog, setEmailVerifyDialog] = React.useState(false);
  const [termRuleDialog, setTermRuleDialog] = React.useState(false);
  const [privacyRuleDialog, setPrivacyRuleDialog] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [acceptedRule, setAcceptedRule] = React.useState(false);
  const [singUpError, setSingUpError] = React.useState<any>("");

  const handleAcceptedRuleChange = () => {
    setAcceptedRule(!acceptedRule);
  };

  const visibleSubmitButton = (isVisible: Boolean) => {
    if (isVisible) {
      setSubmitLoading(false);
      setAcceptedRule(true);
    } else {
      setSubmitLoading(true);
      setAcceptedRule(false);
    }
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    visibleSubmitButton(false);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (user: any) {
        const currentUser = auth.currentUser;
        if (currentUser === null) {
          return;
        }
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            currentUser
              .sendEmailVerification()
              .then(() => {
                auth.signOut();
                setEmailVerifyDialog(true);
              })
              .catch((error: any) => {
                setSingUpError("Email verify error. Could you contact us?");
                visibleSubmitButton(true);
              });
          })
          .catch((error: any) => {
            setSingUpError(error.message);
            visibleSubmitButton(true);
          });
      })
      .catch((error: any) => {
        setSingUpError(error.message);
        visibleSubmitButton(true);
      });
  };

  const handleCloseEmailVerifyDialog = () => {
    setEmailVerifyDialog(false);
    props.history.push("/login");
  };

  const handleOpenTermRuleDialog = () => {
    setTermRuleDialog(true);
  };

  const handleCloseTermRuleDialog = () => {
    setTermRuleDialog(false);
  };

  const handleOpenPrivacyRuleDialog = () => {
    setPrivacyRuleDialog(true);
  };

  const handleClosePrivacyRuleDialog = () => {
    setPrivacyRuleDialog(false);
  };

  return (
    <div>
      <h2>Sign up</h2>

      {/* email verify dialog */}
      <Dialog
        open={emailVerifyDialog}
        onClose={handleCloseEmailVerifyDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Please verify your email address"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            For improved security, you need to verify your email address so that you can login and use some functions for a login-user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmailVerifyDialog} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* term rule dialog */}
      <Dialog
        open={termRuleDialog}
        onClose={handleCloseTermRuleDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Document pathFile={termFilePath} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermRuleDialog} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* privacy rule dialog */}
      <Dialog
        open={privacyRuleDialog}
        onClose={handleClosePrivacyRuleDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Document pathFile={privacyFilePath} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrivacyRuleDialog} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <form className='register-form' onSubmit={(e) => handleSignUp(e)}>
        <div className='alert'>
          <Alert severity='info'>
            <Link component={RouterLink} to='/login'>
              if you already have an account, click here
            </Link>
          </Alert>
        </div>
        <TextField className='margin8' required id='displayname' label='display name' fullWidth onChange={(e) => setName(e.target.value)} />
        <TextField className='margin8' required id='email' label='email' type='email' fullWidth onChange={(e) => setEmail(e.target.value)} />
        <TextField
          className='margin8'
          required
          id='password'
          label='password'
          type='password'
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='rule-link center'>
          <Link onClick={handleOpenTermRuleDialog}>Terms of Service</Link>
        </div>
        <div className='rule-link center'>
          <Link onClick={handleOpenPrivacyRuleDialog}>Privacy Policy</Link>
        </div>
        <FormControlLabel
          className='rule-checkbox'
          control={<Checkbox onChange={handleAcceptedRuleChange} color='primary' />}
          label='Agree above rules'
        />
        {singUpError && (
          <div className='margin8'>
            <Alert severity='error'>{singUpError}</Alert>
          </div>
        )}
        <Grid className='margin8'>
          <div className='loading-wrapper'>
            <Button variant='contained' color='primary' size='large' type='submit' disabled={!acceptedRule}>
              Register
            </Button>
            {submitLoading && <CircularProgress className='loading' size={24} />}
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default SignUpPage;
