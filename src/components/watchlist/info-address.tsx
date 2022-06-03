import React from "react";
import { styled } from "../../styles";
import { Avatar } from "../common/avatar";
import { FiatAmountView } from "../fiat-amount";
import { InfoLine } from "./info-line";
import { ReactComponent as TokensIcon } from "../../icons/tokens.svg";
import { ReactComponent as WalletIcon } from "../../icons/wallet.svg";
import { CopyToClipboard } from "../common/copy-to-clipboard";
import { WatchlistElement } from "../../types/watchlist";

const Wrapper = styled("div", {
  display: "flex",
});

const Info = styled("div", {
  marginLeft: 16,

  "& > *:not(:first-child)": {
    marginTop: 8,
  },
});

const Address = styled("div", {
  display: "flex",
  alignItems: "center",
  color: "#3F68C0",
});

const Secondary = styled("span", {
  color: "#767676",
});

type Props = {
  element: WatchlistElement;
};

export const InfoAddress: React.FC<Props> = ({
  element: { baseToken, address, tokens, totalBalance, iconUrl },
}) => {
  return (
    <Wrapper>
      <Avatar iconUrl={iconUrl} size={50} />
      <Info>
        <Address>
          {address} <CopyToClipboard text={address} />
        </Address>
        <InfoLine icon={{ url: "/xdai.png" }}>
          <span>
            {baseToken.amount} {baseToken.tokenName}{" "}
            <Secondary>
              (<FiatAmountView value={baseToken.estimated} />)
            </Secondary>
          </span>
        </InfoLine>
        {tokens ? (
          <InfoLine icon={{ Component: TokensIcon }}>
            <span>
              {tokens.quantity} tokens{" "}
              <Secondary>
                (<FiatAmountView value={tokens.estimated} />)
              </Secondary>
            </span>
          </InfoLine>
        ) : null}
        <InfoLine icon={{ Component: WalletIcon }}>
          <span>
            Total balance: <FiatAmountView value={totalBalance} />
          </span>
        </InfoLine>
      </Info>
    </Wrapper>
  );
};
