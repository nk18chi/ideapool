import React, { FC, useEffect } from "react";
import { Grid } from "@material-ui/core/";
import { jsx, css } from "@emotion/core";
import { Color } from "./style/Color";
import { changeWordStyle } from "../utils/words";
import { GreenSwitch } from "./common/GreenSwitch";
/** @jsx jsx */

type TWordSlot = {
  index: number;
  text: string;
  isOn: boolean;
  handleSwitchChange: (index: number) => void;
};

export const WordSlot: FC<TWordSlot> = ({ index, text, isOn, handleSwitchChange }) => {
  const [slotWord, setSlotWord] = React.useState<{ text: string; isOn: boolean }>({
    text: text,
    isOn: isOn,
  });
  const wordRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    changeWordStyle(wordRef)?.then(() => {
      setSlotWord((prev) => ({ ...prev, text: text }));
    });
  }, [text]);

  const StyleComponent = css`
    width: 30%;
    display: grid;
    margin: auto 0;
    position: relative;
    top: 24px;
  `;

  const StyleSlotCommon = css`
    padding: 24px 0;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  `;

  const StyleSlotModel = css`
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

  return (
    <Grid css={StyleComponent}>
      <Grid item css={StyleSlot}>
        <input ref={wordRef} value={slotWord.text} onChange={(e) => setSlotWord((prev) => ({ ...prev, text: e.target.value }))} />
      </Grid>
      <Grid item css={StyleSlotModel}>
        <GreenSwitch index={index} value={isOn} handleSwitchChange={handleSwitchChange} />
      </Grid>
    </Grid>
  );
};
