import { css } from "@emotion/core";
import { Color } from "./Color";

/** @jsx jsx */

export const StyleMainTitle = css`
  margin: 40px 0 16px;
  font-size: 32px;
  font-weight: 800;
  text-align: center;
`;

export const StyleInput = css`
  margin: 8px 0;
`;

export const StyleMargin4 = css`
  margin: 4px;
`;

export const StylePointer = css`
  cursor: pointer;
`;

export const StyleSubmitButton = css`
  margin-top: 20px;
`;

export const StyleCicularWrapper = css`
  position: relative;
`;

export const StyleCicular = css`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -12px;
`;

export const StyleSlotContainer = css`
  overflow: hidden;
  margin: 0 auto;
  margin-top: 32px;
  padding-bottom: 24px;
`;

export const StyleButton = css`
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

export const StyleSlotCommon = css`
  padding: 24px 0;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

export const StyleSlotModel = css`
  width: 30%;
  float: left;
  text-align: center;
`;
