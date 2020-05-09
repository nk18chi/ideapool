import React, { Fragment } from "react";
import "./App.css";
import { Button } from "@material-ui/core/";

const App: React.FC = () => {
  var seenWords: Set<number> = new Set();
  const words: string[] = ["Telphone", "Music", "Internet", "AI", "Book", "Fashion", "Social Network", "Delivery", "Taxi", "Software Enginner"];
  const [threeWords, setThreeWords] = React.useState<string[]>([getWord(), getWord(), getWord()]);
  const wordRefs = React.useRef<any>([React.useRef(), React.useRef(), React.useRef()]);

  const typingIntervalRef = React.useRef<any>();
  const cursorIntervalRef = React.useRef<any>();
  const [typingRefs, settypingRefs] = React.useState<any[]>([React.useRef(), React.useRef(), React.useRef()]);
  const [typingTextArr, settypingTextArr] = React.useState<string[]>(["", "", ""]);
  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isCursor, setIsCursor] = React.useState(true);

  const typingTextData = [
    "Let's think creatively!",
    "Come up with a new idea by combining the following three words.",
    "ex.) 📞Telephone　✖️ 🎵Music　✖️ 🌍Internet　= 📱iPhone",
  ];

  React.useEffect(() => {
    if (isCursor) {
      cursorIntervalRef.current = setInterval(() => {
        let newRefs = typingRefs;
        let curColor = newRefs[count].current.style.borderColor;
        newRefs[count].current.style.borderColor = curColor === "black" ? "white" : "black";
        settypingRefs(newRefs);
      }, 200);
    }
    return () => {
      clearInterval(cursorIntervalRef.current);
    };
  }, [count, isCursor, typingRefs]);

  React.useEffect(() => {
    typingIntervalRef.current = settypingTextArr(typingTextArr);
  }, [typingTextArr]);

  React.useEffect(() => {
    if (count < typingTextData.length) {
      if (index < typingTextData[count].length) {
        typingIntervalRef.current = setInterval(() => {
          let newTextArr: string[] = typingTextArr;
          newTextArr[count] += typingTextData[count][index];
          settypingTextArr(newTextArr);
          setIndex(index + 1);
        }, 40);
      } else {
        setIndex(0);
        typingRefs[count].current.style.borderColor = "white";
        setCount(count + 1);
      }
    } else {
      setIsCursor(false);
    }
    return () => {
      clearInterval(typingIntervalRef.current);
    };
  }, [count, index, typingRefs, typingTextArr, typingTextData]);

  function getWord(): string {
    var i: number = Math.floor(Math.random() * words.length);
    while (seenWords.has(i)) {
      i = Math.floor(Math.random() * words.length);
    }
    seenWords.add(i);
    return words[i];
  }

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
        {typingTextArr.map((t: string, i: number) => (
          <div key={i}>
            {i === 0 ? (
              <h2 ref={typingRefs[i]}>{t}</h2>
            ) : (
              <p ref={typingRefs[i]} className='description'>
                {t}
              </p>
            )}
          </div>
        ))}
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
