import React from "react";
import ReactSwitch from "react-switch";
import { styled } from "../../styles";

const Wrapper = styled(ReactSwitch, {
  background: "red",
});

type Props = React.ComponentProps<typeof ReactSwitch>;

export const Switch: React.FC<Props> = ({ ...props }) => {
  return (
    <Wrapper
      {...props}
      onColor="#8CB880"
      uncheckedIcon={false}
      checkedIcon={false}
    />
  );
};
