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
    valid: {
      true: {
        color: "#04795B",
        borderColor: "#04795B",
      },
      false: {
        color: "#EB235F",
        borderColor: "#EB235F",
      },
    },

    disabled: {
      true: {
        backgroundColor: "#C4C4C4",
      },
    },
  },

  compoundVariants: [
    {
      valid: true,
      disabled: true,
      css: {
        backgroundColor: "rgba(4, 121, 91, 0.1)",
      },
    },
  ],

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
  inputProps?: React.HTMLProps<HTMLInputElement>;
  value?: string;
  label?: string;
  valid?: boolean;
  disabled?: boolean;
};

export const Input: React.FC<Props> = ({
  inputProps,
  value,
  valid,
  label,
  disabled,
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
    <Wrapper
      valid={value ? valid : undefined}
      onClick={focusInput}
      disabled={disabled}
    >
      {label && value ? <Label>{label}</Label> : null}
      <InputWrapper
        {...inputProps}
        placeholder={label}
        disabled={disabled}
        ref={(e) => {
          if (inputProps) {
            (inputProps.ref as React.RefCallback<HTMLInputElement>)(e);
          }
          inputRef.current = e;
        }}
        value={value}
      />
    </Wrapper>
  );
};
