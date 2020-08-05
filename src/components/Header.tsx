import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@material-ui/core";
import { Add, AccountCircle, Highlight, List } from "@material-ui/icons";
import AddIdea from "./modal/AddIdea";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { jsx, css } from "@emotion/core";
import { Color } from "./style/Color";
import SnackBar from "./common/SnackBar";

/** @jsx jsx */

const Header: React.FC = () => {
  const { user, auth } = React.useContext(FirebaseContext);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [openAddIdeaForm, setOpenAddIdeaForm] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleSingOut = () => {
    auth.signOut();
    handleMenuClose();
    setShowSnackBar(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const StyleAppBar = css`
    background-color: #222;
  `;

  const StyleToolbar = css`
    padding-left: 200px;
    padding-right: 200px;
  `;

  const StyleLogo = css`
    color: ${Color.MainColor};
    font-weight: 800;
    font-size: 24px;
    color: #ffd31d;
    padding-right: 4px;
    position: relative;
    bottom: 1px;
  `;

  const StyleSiteName = css`
    color: ${Color.MainColor};
    font-weight: 800;
    font-size: 24px;
    &:hover {
      text-decoration: none;
    }
  `;

  const StyleHeaderText = css`
    font-size: 16px;
    font-weight: 800;
    color: #fff;
    &:hover {
      text-decoration: none;
    }
  `;

  const StyleSignUpButton = css`
    ${StyleHeaderText}
    background-color: ${Color.MainColor};
    padding: 12px;
    border-radius: 4px;
    margin-left: 12px;
    &:hover {
      background-color: ${Color.MainColor};
    }
  `;

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSingOut}>Logout</MenuItem>
    </Menu>
  );

  const renderSnackBar = <SnackBar showSnackBar={showSnackBar} setShowSnackBar={setShowSnackBar} message={"success to logout"} />;
  const renderAddIdea = <AddIdea isOpen={openAddIdeaForm} handleOpenDialog={setOpenAddIdeaForm} />;

  return (
    <React.Fragment>
      <AppBar position='static' css={StyleAppBar}>
        <Toolbar css={StyleToolbar}>
          <Highlight css={StyleLogo} />
          <Typography variant='h1' noWrap css={StyleSiteName}>
            <Link css={StyleSiteName} component={RouterLink} to='/'>
              ideapool
            </Link>
          </Typography>
          <div
            css={css`
              flex-grow: 1;
            `}
          />

          {user.loading ? (
            <React.Fragment></React.Fragment>
          ) : user.uid ? (
            <React.Fragment>
              <div>
                <IconButton color='inherit' css={StyleHeaderText} onClick={() => setOpenAddIdeaForm(true)}>
                  <Add />
                  add idea
                </IconButton>
              </div>
              <div>
                <IconButton color='inherit' css={StyleHeaderText} component={RouterLink} to='/my_ideas'>
                  <List />
                  my ideas
                </IconButton>
              </div>
              <div>
                <IconButton edge='end' onClick={handleProfileMenuOpen} color='inherit'>
                  <AccountCircle />
                </IconButton>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div>
                <IconButton color='inherit' css={StyleHeaderText} component={RouterLink} to='/login'>
                  Login
                </IconButton>
              </div>
              <div>
                <IconButton css={StyleSignUpButton} component={RouterLink} to='/signup'>
                  Sign up
                </IconButton>
              </div>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderSnackBar}
      {renderAddIdea}
    </React.Fragment>
  );
};

export default Header;
