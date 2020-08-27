import { auth } from "./firebase";

// sign up
export const createUserWithEmailAndPassword = (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password);

// sign in
export const signInWithEmailAndPassword = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password);

// sign out
export const signOut = () => auth.signOut();

// reset password
export const resetPassword = (email: string) => auth.sendPasswordResetEmail(email);

// change password
export const changePassword = (password: string) => auth.currentUser!.updatePassword(password);
