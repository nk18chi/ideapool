import React, { Fragment } from "react";
import "./Top.scss";
import { Button, Switch } from "@material-ui/core/";
import { words } from "../../../data/words";
import { Shuffle } from "@material-ui/icons/";

var seenWords: Set<string> = new Set();
const initialWords = [getWord(), getWord(), getWord()];

function getWord(): string {
  var i: number = Math.floor(Math.random() * words.length);
  while (seenWords.has(words[i])) {
    i = Math.floor(Math.random() * words.length);
  }
  seenWords.add(words[i]);
  return words[i];
}

const TopPage: React.FC = () => {
  const [shuffleWords, setShuffleWords] = React.useState<string[]>(initialWords);
  const wordRefs = React.useRef<any>([React.useRef(), React.useRef(), React.useRef()]);
  const [fixedSwitch, setFixedSwitch] = React.useState([false, false, false]);

  const typingIntervalRef = React.useRef<any>();
  const cursorIntervalRef = React.useRef<any>();
  const [typingRefs, settypingRefs] = React.useState<any[]>([React.useRef(), React.useRef(), React.useRef()]);
  const [typingTextArr, settypingTextArr] = React.useState<string[]>(["", "", ""]);
  const [index, setIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isCursor, setIsCursor] = React.useState(true);
  const [isShuffleBtn, setIsShuffleBtn] = React.useState(true);

  const typingTextData = [
    "Let's think creatively!",
    "Try to come up with a new idea by combining the following three words.",
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

  React.useEffect(() => {
    let swtchCount: number = fixedSwitch.filter((sc: boolean) => sc).length;
    setIsShuffleBtn(swtchCount !== fixedSwitch.length);
  }, [fixedSwitch, isShuffleBtn]);

  function resetWords(e: any) {
    Promise.all(
      wordRefs.current.map(async (ref: any, i: number) => {
        if (fixedSwitch[i]) {
          return "success";
        }
        return await changeWordStyle(ref);
      })
    ).then((results) => {
      results.forEach((result) => {
        if (result !== "success") {
          console.error("shuffle words error...");
          return;
        }
      });
      for (var i = 0; i < shuffleWords.length; i++) {
        if (fixedSwitch[i]) {
          continue;
        }
        seenWords.delete(shuffleWords[i]);
      }
      let newThreeWords = shuffleWords.map((w: any, i: number) => {
        return fixedSwitch[i] ? w : getWord();
      });
      setShuffleWords([...newThreeWords]);
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

  const handleSwitchChange = (num: number) => {
    setFixedSwitch(
      fixedSwitch.map((sc: any, i: number) => {
        return i === num ? !sc : sc;
      })
    );
  };

  const handleTextChange = (num: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setShuffleWords(
      shuffleWords.map((w: any, i: number) => {
        return i === num ? event.target.value : w;
      })
    );
  };

  return (
    <article>
      {typingTextArr.map((t: string, i: number) => (
        <div key={i}>
          {i === 0 ? (
            <h2 className='typing-text' ref={typingRefs[i]}>
              {t}
            </h2>
          ) : (
            <p ref={typingRefs[i]} className='typing-text description'>
              {t}
            </p>
          )}
        </div>
      ))}
      <ul className='three-elements-container slot-words'>
        {shuffleWords.length > 0 &&
          shuffleWords.map((word: string, i: number) => (
            <Fragment key={i}>
              <li className='slot-word-li'>
                <input ref={wordRefs.current[i]} value={word} onChange={(e) => handleTextChange(i, e)} />
              </li>
              {i < shuffleWords.length - 1 && (
                <li className='middle-li'>
                  <p>×</p>
                </li>
              )}
            </Fragment>
          ))}
      </ul>
      <ul className='three-elements-container switch-controller'>
        {fixedSwitch.map((sc: any, i: number) => (
          <Fragment key={i}>
            <li>
              <Switch key={i} color='primary' checked={sc} onChange={() => handleSwitchChange(i)} />
            </li>
            {i < fixedSwitch.length - 1 && (
              <li className='middle-li white'>
                <p>×</p>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
      <Button
        className='shuffle-btn yellow-btn'
        variant='contained'
        color='primary'
        size='large'
        onClick={resetWords}
        disabled={!isShuffleBtn}
        startIcon={<Shuffle />}
      >
        Shuffle
      </Button>
    </article>
  );
};

export default TopPage;
