import Image from "next/image";
import React from "react";
import { styled } from "../../styles";

const Wrapper = styled("div", {
  borderRadius: "50%",
});

type Props = {
  size: number;
  iconUrl: string;
  alt?: string;
};

export const Avatar: React.FC<Props> = ({ iconUrl, size, alt = "" }) => {
  return (
    <Wrapper>
      <Image
        width={size}
        height={size}
        src={iconUrl}
        alt={alt}
        layout="fixed"
      />
    </Wrapper>
  );
};
