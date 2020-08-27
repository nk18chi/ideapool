import { RouteComponentProps } from "react-router";

export type TSnacBar = {
  showSnackBar: boolean;
  setShowSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};

export type TAddIdea = {
  isOpen: boolean;
  handleOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TDetailIdea = {
  isOpen: boolean;
  handleOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  ideaId: string;
};

export type TGreenSwitch = {
  index: number
  value: boolean;
  handleSwitchChange: any;
};

export type TMatchProps = RouteComponentProps<{ ideaId: string }>;

export type TWordSlot = {
  text: string;
  isFixed: boolean;
};
