import Image from "next/image";
import Head from "next/head";
import React from "react";
import { styled } from "../../styles";
import { Menu } from "./menu";

const Wrapper = styled("div", {
  display: "flex",
  padding: "4rem 2rem",
});

const Footer = styled("footer", {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "12px 0",
  borderTop: "1px solid #eaeaea",
  justifyContent: "center",
  alignItems: "center",

  fontSize: "80%",
  color: "#767676",
});

const FooterBlock = styled("div", {
  "& + &": {
    marginTop: 8,
  },
});

const FooterLink = styled("a", {
  textDecoration: "underline",
});

const Title = styled("h1", {
  fontWeight: 600,
  fontSize: 48,
  lineHeight: "58px",
  marginVertical: 0,
  marginBottom: 38,
});

const LogoWrapper = styled("div", {
  // We need to match the height with the title
  minHeight: 58,
  display: "flex",
  alignItems: "center",
});

const Main = styled("main", {
  marginLeft: "2rem",
  width: "100%",
});

type Props = {
  title: string;
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Based on create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <header>
          <LogoWrapper>
            <Image src="/logo.svg" alt="Logo" width={141} height={30} />
          </LogoWrapper>
          <Menu />
        </header>
        <Main>
          <Title>{title}</Title>
          {children}
        </Main>
      </Wrapper>

      <Footer>
        <FooterBlock>
          Built by{" "}
          <FooterLink key="link" href="https://t.me/luixo">
            luixo
          </FooterLink>
        </FooterBlock>
      </Footer>
    </>
  );
};
