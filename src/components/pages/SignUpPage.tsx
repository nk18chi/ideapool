import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
  Typography,
  Container,
} from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Document from "./static/Document";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { StyleMainTitle, StyleInput, StylePointer, StyleMargin4, StyleSubmitButton, StyleCicularWrapper, StyleCicular } from "../style/Common.style";
import { jsx, css } from "@emotion/core";

const termFilePath = require("../../doc/TermsOfService.md");
const privacyFilePath = require("../../doc/PrivacyPolicy.md");

/** @jsx jsx */

export const SignUpPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { auth } = React.useContext(FirebaseContext);
  const [emailVerifyDialog, setEmailVerifyDialog] = React.useState(false);
  const [termRuleDialog, setTermRuleDialog] = React.useState(false);
  const [privacyRuleDialog, setPrivacyRuleDialog] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [acceptedRule, setAcceptedRule] = React.useState(false);
  const [singUpError, setSingUpError] = React.useState<string>("");

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

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    visibleSubmitButton(false);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
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
              .catch(() => {
                setSingUpError("Email verify error. Could you contact us?");
                visibleSubmitButton(true);
              });
          });
      })
      .catch((error) => {
        setSingUpError(error.message);
        visibleSubmitButton(true);
      });
  };

  const handleCloseEmailVerifyDialog = () => {
    setEmailVerifyDialog(false);
    history.push("/login");
  };

  const handleTermRuleDialog = (bool: boolean) => {
    setTermRuleDialog(bool);
  };

  const handlePrivacyRuleDialog = (bool: boolean) => {
    setPrivacyRuleDialog(bool);
  };

  const StyleAlert = css`
    margin-bottom: 12px;
  `;

  const StyleRuleContainer = css`
    margin: 12px 0;
  `;

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' css={StyleMainTitle} align='center'>
        Sign up
      </Typography>

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
        onClose={() => handleTermRuleDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Document pathFile={termFilePath} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleTermRuleDialog(false)} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* privacy rule dialog */}
      <Dialog
        open={privacyRuleDialog}
        onClose={() => handlePrivacyRuleDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Document pathFile={privacyFilePath} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlePrivacyRuleDialog(false)} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <form onSubmit={(e) => handleSignUp(e)}>
        <Alert severity='info' css={StyleAlert}>
          <Link component={RouterLink} to='/login'>
            if you already have an account, click here
          </Link>
        </Alert>
        <TextField css={StyleInput} required id='displayname' label='display name' fullWidth onChange={(e) => setName(e.target.value)} />
        <TextField css={StyleInput} required id='email' label='email' type='email' fullWidth onChange={(e) => setEmail(e.target.value)} />
        <TextField css={StyleInput} required id='password' label='password' type='password' fullWidth onChange={(e) => setPassword(e.target.value)} />
        <Grid container direction='column' alignItems='center' css={StyleRuleContainer}>
          <Grid item xs={12} css={StyleMargin4}>
            <Link css={StylePointer} onClick={() => handleTermRuleDialog(true)}>
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={12} css={StyleMargin4}>
            <Link css={StylePointer} onClick={() => handlePrivacyRuleDialog(true)}>
              Privacy Policy
            </Link>
          </Grid>
          <FormControlLabel
            className='rule-checkbox'
            control={<Checkbox onChange={handleAcceptedRuleChange} color='primary' />}
            label='Agree above rules'
          />
          {singUpError && (
            <Alert css={StyleAlert} severity='error'>
              {singUpError}
            </Alert>
          )}
          <Grid item xs={12} css={StyleCicularWrapper}>
            <Button css={StyleSubmitButton} variant='contained' color='primary' size='large' type='submit' disabled={!acceptedRule || submitLoading}>
              Register
            </Button>
            {submitLoading && <CircularProgress css={StyleCicular} size={24} />}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
