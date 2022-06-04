import React from "react";
import { CopyToClipboard } from "../common/copy-to-clipboard";

type Props = {
  value: string;
};

export const Copyable: React.FC<Props> = ({ value }) => {
  return (
    <span>
      {value} <CopyToClipboard text={value} />
    </span>
  );
};
