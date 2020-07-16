import React, { createContext, useEffect, useState } from "react";
import { auth, database, storage } from "../firebase/firebase";

export const FirebaseContext = createContext<any | null>(null);

const FirebaseContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any | null>({ authUser: null, loading: false });

  useEffect(() => {
    setUser({ authUser: null, loading: true, profile: null });
    const unsubscribe = auth.onAuthStateChanged(async (usr: any) => {
      if (usr && usr.emailVerified) {
        let isAdmin = false;
        await usr.getIdTokenResult().then((idTokenResult: any) => {
          if (idTokenResult.claims.admin) {
            isAdmin = true;
          }
        });
        setUser({ authUser: usr, loading: false, isAdmin: isAdmin });
      } else {
        setUser({ authUser: null, loading: false, isAdmin: false });
      }
    });
    return () => unsubscribe();
  }, []);

  return <FirebaseContext.Provider value={{ user, auth, database, storage }}>{children}</FirebaseContext.Provider>;
};
export default FirebaseContextProvider;
