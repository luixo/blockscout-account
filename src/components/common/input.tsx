import React from "react";
import { styled } from "../../styles";

const Wrapper = styled("div", {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#C4C4C4",
  borderRadius: 10,
  height: 60,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",

  variants: {
    validity: {
      true: {
        color: "#04795B",
        borderColor: "#04795B",
      },
      false: {
        color: "#EB235F",
        borderColor: "#EB235F",
      },
    },
  },

  "& + &": {
    marginTop: 12,
  },
});

const Label = styled("div", {
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "15px",
  marginBottom: 4,
});

const InputWrapper = styled("input", {
  width: "100%",
  border: "none",
  padding: 0,

  "&:focus": {
    outline: "none",
  },
});

type Props = {
  inputProps: React.HTMLProps<HTMLInputElement>;
  value?: string;
  label?: string;
  valid?: boolean;
};

export const Input: React.FC<Props> = ({
  inputProps,
  value,
  valid,
  label: description,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>();
  const focusInput = React.useCallback(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    input.focus();
  }, [inputRef]);
  return (
    <Wrapper validity={value ? valid : undefined} onClick={focusInput}>
      {description && value ? <Label>{description}</Label> : null}
      <InputWrapper
        {...inputProps}
        placeholder={description}
        ref={(e) => {
          (inputProps.ref as React.RefCallback<HTMLInputElement>)(e);
          inputRef.current = e;
        }}
      />
    </Wrapper>
  );
};
