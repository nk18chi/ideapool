import React, { Fragment } from "react";
import "./App.css";
import { Button } from "@material-ui/core/";
import { Language, PhoneIphone, Phone, MusicNote } from "@material-ui/icons/";

var seenWords: Set<number> = new Set();
const words: string[] = ["Telphone", "Music", "Internet", "AI", "Book", "Fashion", "Social Network", "Delivery", "Taxi", "Software Enginner"];

function getWord(): string {
  var i: number = Math.floor(Math.random() * words.length);
  while (seenWords.has(i)) {
    i = Math.floor(Math.random() * words.length);
  }
  seenWords.add(i);
  return words[i];
}

const App: React.FC = () => {
  const [threeWords, setThreeWords] = React.useState<string[]>([getWord(), getWord(), getWord()]);
  const wordRefs = React.useRef<any>([React.createRef(), React.createRef(), React.createRef()]);

  function resetWords(e: any) {
    Promise.all(
      wordRefs.current.map(async (ref: any) => {
        return await changeWordStyle(ref);
      })
    ).then((results) => {
      results.forEach((result) => {
        if (result !== "success") {
          console.error("shuffle words error...");
          return;
        }
      });
      seenWords = new Set();
      setThreeWords([getWord(), getWord(), getWord()]);
    });
  }

  async function changeWordStyle(ref: any) {
    ref.current.style.transform = "translateY(-100%)";
    ref.current.style.opacity = 0;
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        ref.current.style.transitionDuration = "0s";
        ref.current.style.transform = "translateY(100%)";

        setTimeout(() => {
          ref.current.style.transitionDuration = "0.3s";
          ref.current.style.transform = "translateY(0)";
          ref.current.style.opacity = 1;
          try {
            resolve("success");
          } catch (err) {
            reject(err);
          }
        }, 20);
      }, 250);
    });
  }

  return (
    <div className='App'>
      <header>
        <h1>Idea Bank</h1>
      </header>
      <article>
        <h2>Let's think creatively!</h2>
        <p className='description'>Come up with a new idea by combining the following three words.</p>
        <p className='description'>
          ex.)　
          <Phone /> Telephone　✖️　
          <MusicNote /> Music　✖️　
          <Language /> Internet　=　
          <PhoneIphone /> iPhone
        </p>
        <ul className='slot-words'>
          {threeWords.length > 0 &&
            threeWords.map((word: string, i: number) => (
              <Fragment key={i}>
                <li className='slot-word-li'>
                  <p ref={wordRefs.current[i]}>{word}</p>
                </li>
                {i < threeWords.length - 1 && (
                  <li className='middle-li'>
                    <p>×</p>
                  </li>
                )}
              </Fragment>
            ))}
        </ul>
        <Button className='shuffle-btn' variant='contained' color='primary' onClick={resetWords}>
          Shuffle
        </Button>
      </article>
      <footer>2020 © ideabank-1887f.web.app All Rights Reserved.</footer>
    </div>
  );
};

export default App;
