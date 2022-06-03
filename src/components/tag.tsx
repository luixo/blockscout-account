import React from "react";
import { styled } from "../styles";

const Wrapper = styled("div", {
  color: "#808992",
  backgroundColor: "rgba(153, 174, 195, 0.2)",
  borderRadius: 4,
  paddingVertical: 2,
  paddingHorizontal: 8,

  fontFamily: "Roboto",
  fontWeight: 600,
  fontSize: 12,
  lineHeight: "130%",
});

type Props = {
  tag: string;
};

export const Tag: React.FC<Props> = ({ tag }) => {
  return <Wrapper>{tag}</Wrapper>;
};
