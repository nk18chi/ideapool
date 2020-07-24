import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

const BackDrop: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <Backdrop open={loading} style={{ zIndex: 1 }}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default BackDrop;
