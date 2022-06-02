import type { NextPage } from "next";
import Head from "next/head";
import { styled } from "../styles";

const Wrapper = styled("div", {
  padding: "0 1rem",
});

const Main = styled("main", {
  minHeight: "calc(100vh - 12px)",
  padding: "16px 0",
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const Footer = styled("footer", {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "12px 0",
  borderTop: "1px solid #eaeaea",
  justifyContent: "center",
  alignItems: "center",
});

const FooterBlock = styled("div", {
  "& + &": {
    marginTop: 8,
  },
});

const FooterLink = styled("a", {
  textDecoration: "underline",
});

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>Account page</title>
        <meta name="description" content="Based on create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </Main>

      <Footer>
        <FooterBlock>
          Built by <FooterLink key="link" href="https://t.me/luixo" />
        </FooterBlock>
      </Footer>
    </Wrapper>
  );
};

export default Home;
