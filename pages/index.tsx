import styled from "styled-components";
import { useEffect, useState } from "react";
import SplashScreen from "./splashScreen";
import CacheLoader from "../components/CacheLoader";
import Players from "./players";
import { Criteria } from "../interfaces/interfaces";
import Head from "next/head";

type HomeProps = {
  desiredPlayer: Criteria;
  setDesiredPlayer: any;
};

export default function Home({ desiredPlayer, setDesiredPlayer }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <StyledDiv>
      <Head>
        <title>MatchBall</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading === true ? (
        <>
          <SplashScreen />
          <CacheLoader />
        </>
      ) : (
        <>
          <Players
            desiredPlayer={desiredPlayer}
            setDesiredPlayer={setDesiredPlayer}
          />
        </>
      )}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  height: 100dvh;
  font-family: baloo_2;
  font-size: 20px;
  position: relative;
  overflow: hidden;
`;
