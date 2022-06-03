import * as React from "react";
import { CopyToClipboard as RawCopyToClipboard } from "react-copy-to-clipboard";
import { styled } from "../../styles";

const Wrapper = styled("span", {
  cursor: "pointer",
  display: "inline-flex",
  size: 20,
});

type Props = {
  text: string;
  onCopy?: (text: string, result: boolean) => void;
};

const SHOW_COPY_OK_TIME = 2000;

export const CopyToClipboard: React.FC<Props> = (props) => {
  const [copiedCounter, setCopiedCounter] = React.useState(0);
  const onCopy = React.useCallback(() => setCopiedCounter((x) => x + 1), []);
  React.useEffect(() => {
    if (copiedCounter) {
      const timeoutId = window.setTimeout(
        () => setCopiedCounter(0),
        SHOW_COPY_OK_TIME
      );
      return () => void window.clearTimeout(timeoutId);
    }
  }, [copiedCounter, setCopiedCounter]);
  return (
    <Wrapper>
      <RawCopyToClipboard text={props.text} onCopy={onCopy}>
        {copiedCounter ? (
          <svg height="16" width="16" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
            ></path>
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m12.909 3h-7.6364c-0.70318 0-1.2727 0.56955-1.2727 1.2727v8.9091h1.2727v-8.9091h7.6364v-1.2727zm1.9091 2.5454h-7c-0.70318 0-1.2727 0.56955-1.2727 1.2727v8.9091c0 0.7032 0.56955 1.2727 1.2727 1.2727h7c0.7032 0 1.2727-0.5695 1.2727-1.2727v-8.9091c0-0.70318-0.5695-1.2727-1.2727-1.2727zm0 10.182h-7v-8.9091h7v8.9091z"
              fill="currentColor"
            />
          </svg>
        )}
      </RawCopyToClipboard>
    </Wrapper>
  );
};
