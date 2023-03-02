import styled from "styled-components";
import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import { Criteria, Member } from "../interfaces/interfaces";
import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type HomeProps = {
  desiredPlayer: Criteria;
  setDesiredPlayer: any;
};

export default function Players({
  desiredPlayer,
  setDesiredPlayer,
}: HomeProps): JSX.Element {
  const [allPlayers, setAllPlayers] = useState<Member[]>([]);

  async function getAllPlayers(): Promise<void> {
    try {
      const response = await fetch("/api/players");
      if (!response.ok) {
        return console.error(
          "Error with the response of the players fetch. Response status: ",
          response.status
        );
      } else {
        const listOfAllPlayers = await response.json();
        setAllPlayers(listOfAllPlayers);
      }
    } catch (error) {
      console.error("Something went wrong with the players fetch: ", error);
    }
  }

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <StyledDiv>
      <Image
        src={"/ball.jpg"}
        alt={"Ball background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />

      <Head>
        <title>MatchBall</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header teaser={"you have a match!"} />
      <Main
        desiredPlayer={desiredPlayer}
        setDesiredPlayer={setDesiredPlayer}
        allPlayers={allPlayers}
        setAllPlayers={setAllPlayers}
        isSelectable={false}
      />
      <Navigation />
      
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

