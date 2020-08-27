import React, { Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core/";
import { Shuffle } from "@material-ui/icons/";
import { jsx, css } from "@emotion/core";
import { getWord } from "../utils/words";
import { TWordSlot } from "../model/component.model";
import { WordSlot } from "./WordSlot";
import { SpaceSlot } from "./SpaceSlot";
import { StyleSlotContainer, StyleButton } from "./style/Common.style";

/** @jsx jsx */

let seenWords: Set<string> = new Set();
const initSlotWord: TWordSlot[] = [
  {
    text: getWord(seenWords),
    isFixed: false,
  },
  {
    text: getWord(seenWords),
    isFixed: false,
  },
  {
    text: getWord(seenWords),
    isFixed: false,
  },
];
const switchCount: number = initSlotWord.length;

export const WordSlotTabPanel = () => {
  const [slotWords, setSlotWords] = React.useState<TWordSlot[]>(initSlotWord);
  const [isShuffleBtn, setIsShuffleBtn] = React.useState<boolean>(true);

  React.useEffect(() => {
    seenWords = new Set();
    setSlotWords(initSlotWord);
  }, []);

  React.useEffect(() => {
    let isFixedCount: number = slotWords.filter((word) => word.isFixed).length;
    setIsShuffleBtn(switchCount !== isFixedCount);
  }, [isShuffleBtn, slotWords]);

  const resetWords = async () => {
    for (const word of slotWords) {
      if (word.isFixed) continue;
      seenWords.delete(word.text);
    }
    let newSlotWords: TWordSlot[] = slotWords.map((word) => {
      return { ...word, text: word.isFixed ? word.text : getWord(seenWords) };
    });
    setSlotWords([...newSlotWords]);
  };

  const handleSwitchChange = (index: number) => {
    setSlotWords((prev) => [
      ...prev.map((word, i) => {
        return { ...word, isFixed: i === index ? !word.isFixed : word.isFixed };
      }),
    ]);
  };

  return (
    <Fragment>
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

      <Grid
        css={css`
          ${StyleSlotContainer}
          margin-top: 12px;
        `}
        container
      >
        {slotWords.length > 0 &&
          slotWords.map((word, i) => (
            <Fragment key={i}>
              <WordSlot index={i} text={word.text} isOn={word.isFixed} handleSwitchChange={handleSwitchChange} />
              {i < switchCount - 1 && <SpaceSlot />}
            </Fragment>
          ))}
      </Grid>

      <Grid container direction='column' alignItems='center'>
        <Button variant='contained' css={StyleButton} color='primary' onClick={resetWords} disabled={!isShuffleBtn} startIcon={<Shuffle />}>
          Shuffle
        </Button>
      </Grid>
    </Fragment>
  );
};
