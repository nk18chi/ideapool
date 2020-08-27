import React, { createContext, useEffect, useState, useContext } from "react";
import { TIdeaContext, TIdeaList } from "../model/idea.model";
import { FirebaseContext } from "./FirebaseContext";
import { getOwnIdeaList } from "../firebase/ideas";
export const IdeaContext = createContext<TIdeaContext>({ ideas: [], loading: false });

const IdeaContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(FirebaseContext);
  const [ideaContext, setIdeasContext] = useState<TIdeaContext>({ ideas: [], loading: true });

  useEffect(() => {
    if (user.loading) return;
    if (!user.uid) {
      setIdeasContext({ ideas: [], loading: false });
      return;
    }

    const success = (newData: TIdeaList[]) => {
      setIdeasContext({ ideas: newData, loading: false });
    };
    getOwnIdeaList(user.uid, success);
  }, [user.loading, user.uid]);

  return <IdeaContext.Provider value={ideaContext}>{children}</IdeaContext.Provider>;
};
export default IdeaContextProvider;
