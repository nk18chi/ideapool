import React, { Fragment } from "react";
import { Button, Switch, Grid, Typography, withStyles } from "@material-ui/core/";
import { words } from "../../data/words";
import { Shuffle } from "@material-ui/icons/";
import { jsx, css } from "@emotion/core";
import { Color } from "../style/Color";
import { StyleMainTitle } from "../style/Common.style";

/** @jsx jsx */

let seenWords: Set<string> = new Set();

const getWord = (): string => {
  let i: number = Math.floor(Math.random() * words.length);
  while (seenWords.has(words[i])) {
    i = Math.floor(Math.random() * words.length);
  }
  seenWords.add(words[i]);
  return words[i];
};

const initialWords = [getWord(), getWord(), getWord()];

export const TopPage: React.FC = () => {
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

  const StyleMainCopy = css`
    margin-bottom: 32px;
  `;

  const StyleButton = css`
    color: #fff;
    background-color: ${Color.MainColor};
    width: 186px;
    height: 56px;
    font-weight: 900;
    font-size: 18px;
    margin-top: 24px;
    &:hover {
      background-color: ${Color.MainColor};
    }
  `;

  const StyleSlotContainer = css`
    margin-bottom: 12px;
    overflow: hidden;
    display: table;
    margin: 0 auto;
    margin-top: 12px;
  `;

  const StyleSlotCommon = css`
    padding: 24px 0;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  `;

  const StyleSlotModel = css`
    width: 30%;
    float: left;
    text-align: center;
  `;

  const StyleSlot = css`
    ${StyleSlotModel}
    background-color: ${Color.MainLightColor};
    border-radius: 8px;
    color: #484848;
    overflow: hidden;

    input {
      ${StyleSlotCommon}
      border: none;
      border-radius: 0;
      outline: none;
      background: none;
      width: 100%;
    }
  `;

  const StyleSlotSpace = css`
    ${StyleSlotCommon}
    width: 5%;
    float: left;
  `;

  const GreenSwitch = withStyles({
    switchBase: {
      "&$checked": {
        color: "#4caf50",
      },
      "&$checked + $track": {
        backgroundColor: "#4caf50",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <article>
      <Grid container css={StyleMainCopy} direction='column' alignItems='center'>
        <Grid item xs={12}>
          <Typography variant='h2' css={StyleMainTitle} align='center'>
            Generate new business ideas
          </Typography>
          <Typography variant='h6' gutterBottom align='center'>
            associates with a new idea by combining the following words.
          </Typography>
          <Typography variant='subtitle1' gutterBottom align='center'>
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
          </Typography>
        </Grid>
      </Grid>

      <Grid css={StyleSlotContainer} container direction='column' alignItems='center'>
        {shuffleWords.length > 0 &&
          shuffleWords.map((word, i) => (
            <Fragment key={i}>
              <Grid item css={StyleSlot}>
                <input ref={wordRefs[i]} value={word} onChange={(e) => handleTextChange(i, e)} />
              </Grid>
              {i < shuffleWords.length - 1 && (
                <Grid item css={StyleSlotSpace}>
                  <span>×</span>
                </Grid>
              )}
            </Fragment>
          ))}
      </Grid>

      <Grid css={StyleSlotContainer} container direction='column' alignItems='center'>
        {fixedSwitch.map((sc, i) => (
          <Fragment key={i}>
            <Grid item css={StyleSlotModel}>
              <GreenSwitch key={i} checked={sc} onChange={() => handleSwitchChange(i)} />
            </Grid>
            {i < fixedSwitch.length - 1 && <Grid item css={StyleSlotSpace}></Grid>}
          </Fragment>
        ))}
      </Grid>

      <Grid container direction='column' alignItems='center'>
        <Button variant='contained' css={StyleButton} color='primary' onClick={resetWords} disabled={!isShuffleBtn} startIcon={<Shuffle />}>
          Shuffle
        </Button>
      </Grid>
    </article>
  );
};
