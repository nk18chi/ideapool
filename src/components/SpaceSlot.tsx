import React from "react";
import { Grid } from "@material-ui/core/";
import { jsx, css } from "@emotion/core";
import { StyleSlotCommon } from "./style/Common.style";
/** @jsx jsx */

const StyleSlotSpace = css`
  ${StyleSlotCommon}
  width: 5%;
  float: left;
  margin: auto 0;
`;

export const SpaceSlot: React.FC = () => {
  return (
    <Grid item css={StyleSlotSpace}>
      <span>×</span>
    </Grid>
  );
};
