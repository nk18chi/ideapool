import React from "react";
import "./Header.scss";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core/";
import { FirebaseContext } from "../../firebase";

const Header: React.FC = () => {
  const { user, auth } = React.useContext(FirebaseContext);
  const handleSingOut = () => {
    auth.signOut();
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
            <Link onClick={handleSingOut}>ログアウト</Link>
          </li>
        ) : (
          <li>
            <Link component={RouterLink} to='/login'>
              ログイン
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
