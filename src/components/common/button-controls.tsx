import React from "react";
import { styled } from "../../styles";
import { EditButton } from "./edit-button";
import { Popup, Props as PopupProps } from "./popup";
import { RemoveButton } from "./remove-button";

const Buttons = styled("div", {
  display: "flex",

  "& > *:not(:first-child)": {
    marginLeft: 24,
  },
});

type Props = {
  editPopupChildren: PopupProps["children"];
  onRemoveClick: () => void;
};

export const ButtonControls: React.FC<Props> = ({
  editPopupChildren,
  onRemoveClick,
}) => {
  return (
    <Buttons>
      <Popup trigger={<EditButton />}>{editPopupChildren}</Popup>
      <RemoveButton onClick={onRemoveClick} />
    </Buttons>
  );
};
