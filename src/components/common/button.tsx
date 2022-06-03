import React from "react";
import { useLoading, Oval } from "@agney/react-loading";
import { styled } from "../../styles";

const Wrapper = styled("div", {
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  display: "inline-flex",
  justifyContent: "center",
  cursor: "pointer",
  color: "white",
  backgroundColor: "#3F68C0",

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
  },
});

const LoadingIndicator = styled("div", {
  marginRight: 8,
  display: "flex",
});

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  minWidth?: number;
  onClick?: () => void;
};

export const Button = React.forwardRef<HTMLDivElement, Props>(
  ({ children, onClick, disabled, loading, minWidth }, ref) => {
    const { containerProps, indicatorEl } = useLoading({
      loading,
      indicator: <Oval width="16" />,
    });
    return (
      <Wrapper
        onClick={disabled ? undefined : onClick}
        ref={ref}
        disabled={disabled}
        {...containerProps}
        css={minWidth ? { minWidth } : undefined}
      >
        {indicatorEl ? (
          <LoadingIndicator>{indicatorEl}</LoadingIndicator>
        ) : null}
        {children}
      </Wrapper>
    );
  }
);
