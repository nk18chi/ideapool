import React, { FC } from "react";
import { Switch, withStyles } from "@material-ui/core/";
import { TGreenSwitch } from "../../model/component.model";

export const GreenSwitch: FC<TGreenSwitch> = ({ index, value, handleSwitchChange }) => {
  const StyleGreenSwitch = withStyles({
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
    <StyleGreenSwitch
      checked={value}
      onChange={() => {
        handleSwitchChange(index);
      }}
    />
  );
};
