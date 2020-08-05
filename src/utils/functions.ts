import * as firebase from "firebase";

export const formatFirebaseDate = (date: firebase.firestore.Timestamp): string => {
  if (date === null) return "";
  return new Date(date.seconds * 1000).toLocaleDateString("en-US");
};

export const trimText = (text: string, size: number = 140): string => {
  if (text.length < size) return text;
  return text.slice(0, size) + "...";
};
