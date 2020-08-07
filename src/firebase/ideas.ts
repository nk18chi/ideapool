import { database } from "./firebase";
import * as firebase from "firebase/app";
import { TIdeaDetail, TIdeaList } from "../model/idea.model";

const ref = database.collection("ideas");

export const getOwnIdeaList = (uid: string, success: (newData: TIdeaList[]) => void) => {
  ref
    .where("user", "==", uid)
    .orderBy("updatedAt", "desc")
    .onSnapshot((snap) => {
      const newData: TIdeaList[] = [];
      snap.forEach((doc) => {
        const data = doc.data();
        newData.push({
          id: doc.id || "",
          title: data.title || "",
          description: data.description || "",
          isPrivate: data.isPrivate !== undefined ? data.isPrivate : true,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      });
      success(newData);
    });
};

export const getIdeaDetail = (id: string): Promise<TIdeaDetail> => {
  return new Promise((resolve, reject) => {
    ref
      .doc(id)
      .get()
      .then((doc) => {
        let data = doc.data();
        const getIdea: TIdeaDetail = {
          id: doc.id || "",
          title: (data && data.title) || "",
          description: (data && data.description) || "",
          isPrivate: data && data.isPrivate !== undefined ? data.isPrivate : true,
          user: (data && data.user) || "",
          createdAt: data && data.createdAt,
          updatedAt: data && data.updatedAt,
        };
        resolve(getIdea);
      })
      .catch((error) => {
        console.error("Error fetching the idea: ", error);
        reject();
      });
  });
};

export const addNewIdea = (newIdea: TIdeaDetail): Promise<null> => {
  return new Promise((resolve, reject) => {
    ref
      .add({
        ...newIdea,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        resolve();
      })
      .catch(function (error) {
        console.error("Error adding a new idea: ", error);
        reject();
      });
  });
};

export const updateIdea = (id: string, idea: TIdeaDetail): Promise<null> => {
  return new Promise((resolve, reject) => {
    ref
      .doc(id)
      .set({ ...idea!, updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
      .then(() => {
        resolve();
      })
      .catch(function (error) {
        console.error("Error updating the idea: ", error);
        reject();
      });
  });
};

export const deleteIdea = (id: string): Promise<null> => {
  return new Promise((resolve, reject) => {
    ref
      .doc(id)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(function (error) {
        console.error("Error deleting the idea: ", error);
        reject();
      });
  });
};
