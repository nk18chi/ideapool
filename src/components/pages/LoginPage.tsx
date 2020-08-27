import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TextField, Button, Grid, CircularProgress, Typography, Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { StyleMainTitle, StyleInput, StyleSubmitButton, StyleCicularWrapper, StyleCicular } from "../style/Common.style";
import { jsx, css } from "@emotion/core";

/** @jsx jsx */

export const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { auth } = useContext(FirebaseContext);
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loginError, setLoginError] = React.useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let user = auth.currentUser;
        if (user && user.emailVerified) {
          history.push("/");
        }
        if (user && !user.emailVerified) {
          setLoginError("You did not verify the email from this app so that you cannot log in. Please confirm your email box again.");
          setSubmitLoading(false);
          user.sendEmailVerification().then(() => {
            auth.signOut();
          });
        }
      })
      .catch((error) => {
        setLoginError(error.message);
        setSubmitLoading(false);
      });
  };

  const StyleForgotPassLink = css`
    margin-top: 24px;
  `;

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' css={StyleMainTitle} align='center'>
        Login
      </Typography>

      <form onSubmit={(e) => handleLogin(e)}>
        <TextField css={StyleInput} required id='email' label='email' type='email' fullWidth onChange={(e) => setEmail(e.target.value)} />
        <TextField css={StyleInput} required id='password' label='password' type='password' fullWidth onChange={(e) => setPassword(e.target.value)} />
        {loginError && <Alert severity='error'>{loginError}</Alert>}
        <Grid container direction='column' alignItems='center'>
          <Grid item xs={12} css={StyleCicularWrapper}>
            <Button css={StyleSubmitButton} variant='contained' color='primary' size='large' type='submit' disabled={submitLoading}>
              Login
            </Button>
            {submitLoading && <CircularProgress css={StyleCicular} size={24} />}
          </Grid>
          <Grid item xs={12} css={StyleForgotPassLink}>
            <Link component={RouterLink} to='/forget_password'>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
