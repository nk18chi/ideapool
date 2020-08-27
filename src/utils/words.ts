import React from "react";
import { words } from "../data/words";

export const getWord = (seenWords: Set<string>): string => {
  let i: number = Math.floor(Math.random() * words.length);
  while (seenWords.has(words[i])) {
    i = Math.floor(Math.random() * words.length);
  }
  seenWords.add(words[i]);
  return words[i];
};

export const changeWordStyle = (ref: React.RefObject<HTMLInputElement>): Promise<string> | undefined => {
  if (ref.current === null) return;
  ref.current.style.transform = "translateY(-100%)";
  ref.current.style.opacity = "0";
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      ref.current!.style.transitionDuration = "0s";
      ref.current!.style.transform = "translateY(100%)";

      setTimeout(() => {
        ref.current!.style.transitionDuration = "0.3s";
        ref.current!.style.transform = "translateY(0)";
        ref.current!.style.opacity = "1";
        try {
          resolve("success");
        } catch (err) {
          reject(err);
        }
      }, 20);
    }, 250);
  });
};
