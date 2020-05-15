import React from "react";
import "./Header.scss";
import { Link as RouterLink } from "react-router-dom";
import { Link, Snackbar } from "@material-ui/core/";
import { FirebaseContext } from "../../firebase";
import MuiAlert from "@material-ui/lab/Alert";

const Header: React.FC = () => {
  const { user, auth } = React.useContext(FirebaseContext);
  const [open, setOpen] = React.useState(false);

  const handleToastClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSingOut = () => {
    auth.signOut();
    setOpen(true);
  };

  return (
    <header>
      <h1>
        <Link component={RouterLink} to='/'>
          Idea Bank
        </Link>
      </h1>
      <ul>
        {!user.loading && user.authUser ? (
          <li>
            <Link onClick={handleSingOut}>logout</Link>
          </li>
        ) : (
          <li>
            <Link component={RouterLink} to='/login'>
              login
            </Link>
          </li>
        )}
      </ul>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleToastClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert onClose={handleToastClose} severity='success'>
          success to logout
        </MuiAlert>
      </Snackbar>
    </header>
  );
};

export default Header;
