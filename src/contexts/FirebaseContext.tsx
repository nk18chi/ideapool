import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { TUser } from "../model/user.model";

type TFirebaseContext = {
  user: TUser;
  auth: firebase.auth.Auth;
};

const initalUser = { uid: null, displayName: null, loading: true, isAdmin: false };
export const FirebaseContext = createContext<TFirebaseContext>({ user: initalUser, auth: auth });

// TODO: rename this file to "userContext"
const FirebaseContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TUser>(initalUser);

  useEffect(() => {
    setUser(initalUser);
    const unsubscribe = auth.onAuthStateChanged(async (usr) => {
      if (usr && usr.emailVerified) {
        let isAdmin = false;
        await usr.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            isAdmin = true;
          }
        });
        setUser({ uid: usr.uid, displayName: usr.displayName, loading: false, isAdmin: isAdmin });
      } else {
        setUser({ ...initalUser, loading: false });
      }
    });
    return () => unsubscribe();
  }, []);

  return <FirebaseContext.Provider value={{ user, auth }}>{children}</FirebaseContext.Provider>;
};
export default FirebaseContextProvider;
