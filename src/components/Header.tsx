import React, { useState } from "react";
import "./Header.scss";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { Link, Snackbar } from "@material-ui/core";
import AddIdea from "./modal/AddIdea";
import { FirebaseContext } from "../contexts/FirebaseContext";

const Header: React.FC = () => {
  const { user, auth } = React.useContext(FirebaseContext);
  const [open, setOpen] = React.useState(false);
  const [openIdeaFormDialog, setOpenIdeaFormDialog] = useState<boolean>(false);
  const handleIdeaFormDialog = (ableOpen: boolean) => {
    setOpenIdeaFormDialog(ableOpen);
  };

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
      <nav>
        <ul className='header-links'>
          {!user.loading && user.uid ? (
            <>
              <li>
                <Link onClick={handleSingOut}>Logout</Link>
              </li>

              <li>
                <Link component={RouterLink} to='/my_ideas'>
                  my idea
                </Link>
              </li>

              <li>
                <Link onClick={() => handleIdeaFormDialog(true)}>add</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link component={RouterLink} to='/signup'>
                  Sign up
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to='/login'>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <h1>
        <Link component={RouterLink} to='/'>
          Idea Pool
        </Link>
      </h1>
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

      {/* add new idea modal */}
      <AddIdea isOpen={openIdeaFormDialog} handleOpenDialog={handleIdeaFormDialog} />
    </header>
  );
};

export default Header;
