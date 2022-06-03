import React from "react";
import ReactPopup from "reactjs-popup";
import { styled } from "../../styles";

const StyledPopup = styled(ReactPopup, {
  "&-overlay": {
    backgroundColor: "rgba(0,0,0,.5)",
  },
});

const Wrapper = styled("div", {
  background: "white",
  padding: 40,
  borderRadius: 30,
  boxShadow: "10px 4px 40px rgba(0, 0, 0, 0.2)",
  display: "flex",
});

type PopupProps = React.ComponentProps<typeof ReactPopup>;

type Props = {
  trigger: PopupProps["trigger"];
  children:
    | PopupProps["children"]
    | ((close: () => void) => PopupProps["children"]);
};

export const Popup: React.FC<Props> = ({ trigger, children }) => {
  // see https://github.com/yjose/reactjs-popup/issues/310
  const popupChildren = ((close: () => void) => {
    return (
      <Wrapper>
        {typeof children === "function" ? children(close) : children}
      </Wrapper>
    );
  }) as unknown as PopupProps["children"];
  return (
    <StyledPopup trigger={trigger} modal closeOnDocumentClick>
      {popupChildren}
    </StyledPopup>
  );
};
