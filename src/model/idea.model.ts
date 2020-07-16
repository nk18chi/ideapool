import * as firebase from "firebase/app";

export type TIdeaContext = {
  ideas: TIdeaList[];
  loading: boolean;
};

export type TIdeaList = {
  id: string;
  title: string;
  description: string;
};

export type TIdeaDetail = {
  title: string;
  description: string;
  // createdAt: firebase.firestore.Timestamp;
  // updatedAt: firebase.firestore.Timestamp;
  user: string;
};
