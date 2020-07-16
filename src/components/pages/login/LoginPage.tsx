import React, { useContext } from "react";
import "./LoginPage.scss";
import { TextField, Button, Grid, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { FirebaseContext } from "../../../contexts/FirebaseContext";

const LoginPage: React.FC = (props: any) => {
  const { auth } = useContext(FirebaseContext);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState<any>("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    setSubmitLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        let user = auth.currentUser;
        if (user && user.emailVerified) {
          props.history.push("/");
        }
        if (user && !user.emailVerified) {
          setLoginError("You did not verify the email from this app so that you cannot log in. Please confirm your email box again.");
          setSubmitLoading(false);
          user.sendEmailVerification().then(() => {
            auth.signOut();
          });
        }
      })
      .catch((error: any) => {
        setLoginError(error.message);
        setSubmitLoading(false);
      });
  };

  return (
    <div className='one-column'>
      <h2>Login Page</h2>
      <form className='login-form' onSubmit={(e) => handleLogin(e)}>
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
        {loginError && (
          <div className='margin8'>
            <Alert severity='error'>{loginError}</Alert>
          </div>
        )}
        <Grid className='margin8'>
          <div className='loading-wrapper'>
            <Button className='yellow-btn' variant='contained' color='primary' size='large' type='submit' disabled={submitLoading}>
              Login
            </Button>
            {submitLoading && <CircularProgress className='loading' size={24} />}
          </div>
        </Grid>
      </form>
      <div className='password-forget-link'>
        <Link component={RouterLink} to='/forget_password'>
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;