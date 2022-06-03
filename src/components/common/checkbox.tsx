import React from "react";
import { styled } from "../../styles";

const Wrapper = styled("div", {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
});

const Label = styled("div", {
  marginLeft: 8,
});

const CheckboxBox = styled("div", {
  size: 20,
  borderRadius: 6,
  border: "1px solid #C4C4C4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  variants: {
    checked: {
      true: {
        background: "#04795B",
        borderColor: "#04795B",
      },
    },
  },
});

const CheckboxInput = styled("input", {
  display: "none",
});

type Props = {
  label?: string;
  checked: boolean;
  onChange: (nextChecked: boolean) => void;
};

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ label: description, checked, onChange, ...rest }, forwardedRef) => {
    const checkboxRef = React.useRef<HTMLInputElement | null>();

    const switchChecked = React.useCallback(
      () => onChange(!checked),
      [onChange, checked]
    );

    return (
      <Wrapper onClick={switchChecked}>
        <CheckboxBox checked={checked}>
          {checked ? (
            <svg width="12" height="10" viewBox="0 0 12 10">
              <path
                d="M3.91993 9.86364L0.119935 5.54545C-0.0400648 5.36364 -0.0400648 5.04545 0.119935 4.81818L0.719935 4.13636C0.879935 3.95455 1.15994 3.95455 1.35994 4.13636L4.23993 7.40909L10.6399 0.136364C10.7999 -0.0454545 11.0799 -0.0454545 11.2799 0.136364L11.8799 0.818182C12.0399 1 12.0399 1.31818 11.8799 1.54545L4.55993 9.86364C4.35993 10.0455 4.07993 10.0455 3.91993 9.86364Z"
                fill="white"
              />
            </svg>
          ) : null}
        </CheckboxBox>
        <CheckboxInput
          ref={(e) => {
            (forwardedRef as React.RefCallback<HTMLInputElement>)(e);
            checkboxRef.current = e;
          }}
          {...rest}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <Label>{description}</Label>
      </Wrapper>
    );
  }
);
