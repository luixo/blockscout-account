import Image from "next/image";
import React from "react";
import { styled } from "../../styles";

const Wrapper = styled("div", {
  display: "flex",
  fontSize: 12,
});

const Children = styled("div", {
  marginLeft: 10,
});

type Props = {
  icon: { url: string } | { Component: React.FC };
  children: React.ReactNode;
};

export const InfoLine: React.FC<Props> = ({ icon, children }) => {
  return (
    <Wrapper>
      {"url" in icon ? (
        <Image src={icon.url} alt="" width={16} height={16} layout="fixed" />
      ) : (
        <icon.Component />
      )}
      <Children>{children}</Children>
    </Wrapper>
  );
};
