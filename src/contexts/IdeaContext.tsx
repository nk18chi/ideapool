import React, { createContext, useEffect, useState, useContext } from "react";
import { TIdeaList, TIdeaContext } from "../model/idea.model";
import { FirebaseContext } from "./FirebaseContext";
export const IdeaContext = createContext<any>([]);

const IdeaContextProvider = ({ children }: any) => {
  const { user, database } = useContext(FirebaseContext);
  const [ideaContext, setIdeasContext] = useState<TIdeaContext>({ ideas: [], loading: false });

  useEffect(() => {
    setIdeasContext({ ideas: [], loading: true });
    if (!user.authUser) {
      return;
    }
    database
      .collection("ideas")
      .where("user", "==", user.authUser.uid)
      .onSnapshot((snap: any) => {
        const newData: TIdeaList[] = [];
        snap.forEach((doc: any) => {
          const data: any = doc.data();
          newData.push({
            id: doc.id || "",
            title: data.title || "",
            description: data.description || "",
          });
        });
        setIdeasContext({ ideas: newData, loading: false });
      });
  }, [database, user.authUser]);

  return <IdeaContext.Provider value={{ ideaContext }}>{children}</IdeaContext.Provider>;
};
export default IdeaContextProvider;
