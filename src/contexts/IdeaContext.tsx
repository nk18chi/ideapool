import React, { createContext, useEffect, useState, useContext } from "react";
import { TIdeaContext } from "../model/idea.model";
import { FirebaseContext } from "./FirebaseContext";
import { getOwnIdeaList } from "../firebase/ideas";
export const IdeaContext = createContext<any>([]);

const IdeaContextProvider = ({ children }: any) => {
  const { user } = useContext(FirebaseContext);
  const [ideaContext, setIdeasContext] = useState<TIdeaContext>({ ideas: [], loading: false });

  useEffect(() => {
    setIdeasContext({ ideas: [], loading: true });
    if (!user.uid) {
      setIdeasContext({ ideas: [], loading: false });
      return;
    }

    const success = (newData: any) => {
      setIdeasContext({ ideas: newData, loading: false });
    };
    getOwnIdeaList(user.uid, success);
  }, [user.uid]);

  return <IdeaContext.Provider value={{ ideaContext }}>{children}</IdeaContext.Provider>;
};
export default IdeaContextProvider;
