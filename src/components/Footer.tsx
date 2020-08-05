import React from "react";
import { Typography } from "@material-ui/core";
import { jsx, css } from "@emotion/core";

/** @jsx jsx */

const Footer: React.FC = () => {
  const StyleFooter = css`
    text-align: center;
    margin-top: 70px;
    color: #ccc;
  `;

  return (
    <footer>
      <Typography css={StyleFooter} variant='caption' display='block' gutterBottom>
        2020 © ideapool.app All Rights Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
