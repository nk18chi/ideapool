import React, { Fragment } from "react";
import "./Top.scss";
import { Button, Switch } from "@material-ui/core/";
import { words } from "../../../data/words";
import { Shuffle } from "@material-ui/icons/";

var seenWords: Set<string> = new Set();

const getWord = (): string => {
  var i: number = Math.floor(Math.random() * words.length);
  while (seenWords.has(words[i])) {
    i = Math.floor(Math.random() * words.length);
  }
  seenWords.add(words[i]);
  return words[i];
};

const initialWords = [getWord(), getWord(), getWord()];

const TopPage: React.FC = () => {
  const [shuffleWords, setShuffleWords] = React.useState<string[]>(initialWords);
  const wordRefs = [React.useRef<HTMLInputElement>(null), React.useRef<HTMLInputElement>(null), React.useRef<HTMLInputElement>(null)];
  const [fixedSwitch, setFixedSwitch] = React.useState<boolean[]>([false, false, false]);
  const [isShuffleBtn, setIsShuffleBtn] = React.useState<boolean>(true);

  React.useEffect(() => {
    let swtchCount: number = fixedSwitch.filter((sc: boolean) => sc).length;
    setIsShuffleBtn(swtchCount !== fixedSwitch.length);
  }, [fixedSwitch, isShuffleBtn]);

  const resetWords = () => {
    Promise.all(
      wordRefs.map(async (ref: any, i: number) => {
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
      let newThreeWords = shuffleWords.map((w, i) => {
        return fixedSwitch[i] ? w : getWord();
      });
      setShuffleWords([...newThreeWords]);
    });
  };

  const changeWordStyle = (ref: any) => {
    ref.current.style.transform = "translateY(-100%)";
    ref.current.style.opacity = 0;
    return new Promise((resolve, reject) => {
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
  };

  const handleSwitchChange = (num: number) => {
    setFixedSwitch(
      fixedSwitch.map((sc, i) => {
        return i === num ? !sc : sc;
      })
    );
  };

  const handleTextChange = (num: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setShuffleWords(
      shuffleWords.map((w, i) => {
        return i === num ? event.target.value : w;
      })
    );
  };

  return (
    <article>
      <div>
        <h2 className='typing-text'>Let's generate a new business idea</h2>
        <p className='typing-text description'>associates with a new idea by combining the following those words.</p>
        <p className='typing-text description'>
          ex.){" "}
          <span role='img' aria-label='phone'>
            📞
          </span>
          Telephone ✖️
          <span role='img' aria-label='music'>
            🎵
          </span>
          Music ✖️
          <span role='img' aria-label='earth'>
            🌍
          </span>
          Internet ={" "}
          <span role='img' aria-label='smartphone'>
            📱
          </span>
          iPhone
        </p>
      </div>
      <ul className='three-elements-container slot-words'>
        {shuffleWords.length > 0 &&
          shuffleWords.map((word: string, i: number) => (
            <Fragment key={i}>
              <li className='slot-word-li'>
                <input ref={wordRefs[i]} value={word} onChange={(e) => handleTextChange(i, e)} />
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
