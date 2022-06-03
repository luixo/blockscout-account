import React from "react";
import { styled } from "../../styles";

const Wrapper = styled("div", {
  cursor: "pointer",
  color: "#F2A5C0",
  size: 20,
});

type Props = {
  onClick: () => void;
};

export const RemoveButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
          <path d="m15.645 19.375h-10c-0.49728 0-0.97419-0.1975-1.3258-0.5492-0.35163-0.3516-0.54918-0.8285-0.54918-1.3258v-11.875c0-0.16576 0.06585-0.32473 0.18306-0.44194s0.27618-0.18306 0.44194-0.18306 0.32473 0.06585 0.44194 0.18306c0.11722 0.11721 0.18306 0.27618 0.18306 0.44194v11.875c0 0.1658 0.06585 0.3247 0.18306 0.4419 0.11721 0.1173 0.27618 0.1831 0.44194 0.1831h10c0.1657 0 0.3247-0.0658 0.4419-0.1831 0.1172-0.1172 0.1831-0.2761 0.1831-0.4419v-11.875c0-0.16576 0.0658-0.32473 0.183-0.44194s0.2762-0.18306 0.442-0.18306c0.1657 0 0.3247 0.06585 0.4419 0.18306s0.1831 0.27618 0.1831 0.44194v11.875c0 0.4973-0.1976 0.9742-0.5492 1.3258-0.3517 0.3517-0.8286 0.5492-1.3258 0.5492z" />
          <path d="m18.145 4.375h-15c-0.16576 0-0.32473-0.06585-0.44194-0.18306s-0.18306-0.27618-0.18306-0.44194 0.06585-0.32473 0.18306-0.44194 0.27618-0.18306 0.44194-0.18306h15c0.1657 0 0.3247 0.06585 0.4419 0.18306s0.1831 0.27618 0.1831 0.44194-0.0659 0.32473-0.1831 0.44194-0.2762 0.18306-0.4419 0.18306z" />
          <path d="m13.145 4.375c-0.1658 0-0.3248-0.06585-0.442-0.18306s-0.183-0.27618-0.183-0.44194v-1.875h-3.75v1.875c0 0.16576-0.06584 0.32473-0.18306 0.44194-0.11721 0.11721-0.27618 0.18306-0.44194 0.18306s-0.32473-0.06585-0.44194-0.18306-0.18306-0.27618-0.18306-0.44194v-2.5c0-0.16576 0.06585-0.32473 0.18306-0.44194s0.27618-0.18306 0.44194-0.18306h5c0.1657 0 0.3247 0.065848 0.4419 0.18306s0.1831 0.27618 0.1831 0.44194v2.5c0 0.16576-0.0659 0.32473-0.1831 0.44194s-0.2762 0.18306-0.4419 0.18306z" />
          <path d="m10.645 16.25c-0.1658 0-0.3248-0.0658-0.442-0.1831-0.1172-0.1172-0.183-0.2761-0.183-0.4419v-8.75c0-0.16576 0.0658-0.32473 0.183-0.44194s0.2762-0.18306 0.442-0.18306c0.1657 0 0.3247 0.06585 0.4419 0.18306s0.1831 0.27618 0.1831 0.44194v8.75c0 0.1658-0.0659 0.3247-0.1831 0.4419-0.1172 0.1173-0.2762 0.1831-0.4419 0.1831z" />
          <path d="m13.77 15c-0.1658 0-0.3248-0.0658-0.442-0.1831-0.1172-0.1172-0.183-0.2761-0.183-0.4419v-6.25c0-0.16576 0.0658-0.32473 0.183-0.44194s0.2762-0.18306 0.442-0.18306c0.1657 0 0.3247 0.06585 0.4419 0.18306s0.1831 0.27618 0.1831 0.44194v6.25c0 0.1658-0.0659 0.3247-0.1831 0.4419-0.1172 0.1173-0.2762 0.1831-0.4419 0.1831z" />
          <path d="m7.5196 15c-0.16576 0-0.32473-0.0658-0.44194-0.1831-0.11721-0.1172-0.18306-0.2761-0.18306-0.4419v-6.25c0-0.16576 0.06585-0.32473 0.18306-0.44194s0.27618-0.18306 0.44194-0.18306 0.32473 0.06585 0.44194 0.18306c0.11722 0.11721 0.18306 0.27618 0.18306 0.44194v6.25c0 0.1658-0.06584 0.3247-0.18306 0.4419-0.11721 0.1173-0.27618 0.1831-0.44194 0.1831z" />
        </g>
      </svg>
    </Wrapper>
  );
};
