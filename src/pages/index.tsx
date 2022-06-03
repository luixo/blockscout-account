import type { GetServerSideProps, NextPage } from "next";

const Home: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      statusCode: 308,
      destination: "/watchlist",
    },
  };
};

export default Home;
