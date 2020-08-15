import * as firebase from "firebase";

export type TIdeaContext = {
  ideas: TIdeaList[];
  loading: boolean;
};

export type TIdeaList = {
  id?: string;
  title: string;
  description: string;
  isPrivate: boolean;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};

export type TIdeaDetail = TIdeaList & {
  user: string;
};

export type TComment = {
  id?: string;
  description: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  user: {
    uid: string;
    displayName: string;
  };
};
