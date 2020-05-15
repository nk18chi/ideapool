import React from "react";
import { auth } from "../../firebase";

function useAuth() {
  const [authUser, setAuthUser] = React.useState<any | null>({ authUser: null, loading: false });

  React.useEffect(() => {
    setAuthUser({ authUser: null, loading: true, profile: null });
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user && user.emailVerified) {
        let isAdmin = false;
        await user.getIdTokenResult().then((idTokenResult: any) => {
          if (idTokenResult.claims.admin) {
            isAdmin = true;
          }
        });
        setAuthUser({ authUser: user, loading: false, isAdmin: isAdmin });
      } else {
        setAuthUser({ authUser: null, loading: false, isAdmin: false });
      }
    });
    return () => unsubscribe();
  }, []);

  return authUser;
}

export default useAuth;
