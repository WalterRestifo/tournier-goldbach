import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import TeamComponent from "../components/TeamComponent";
import { useEffect, useState } from "react";
import { Match } from "../interfaces/interfaces";
import createAutomatedTournament from "../utils/createAutomatedTournament";
import getAllTeams from "../utils/getAllTeams";
import { nanoid } from "nanoid";

type TournamentProps = {
  rounds: any[][];
  setRounds: Function;
};

export default function Tournament({ rounds, setRounds }: TournamentProps) {
  useEffect(() => {
    async function getAllTeamsAndCreateTournament() {
      const teams = await getAllTeams();
      const matchList = createAutomatedTournament(teams);
      setRounds([matchList]);
    }

    async function getRounds(): Promise<any> {
      try {
        const response = await fetch("/api/round");
        if (!response.ok) {
          return console.error(
            "Error with the response of the tournament fetch. Response status: ",
            response.status
          );
        } else {
          const listOfRounds = await response.json();
          return setRounds(listOfRounds);
        }
      } catch (error) {
        console.error("Something went wrong with the matches fetch: ", error);
      }
    }

    if (rounds.length === 0) {
      getAllTeamsAndCreateTournament();
    }
  }, []);
  return (
    <StyledDiv>
      <Head>
        <title>MatchBall</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={"/playergroup.jpg"}
        alt={"Player group background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
      <Header teaser={"Games"} />
      <StyledMatchWrapperSection>
        {rounds.length > 0 &&
          rounds &&
          rounds.map((round: any) => {
            return (
              <StyledUl data-cy="match-list" key={nanoid()}>
                {round.map((match: Match, index: number) => {
                  return (
                    <StyledMatch key={match.id}>
                      <StyledP>Match {index + 1}</StyledP>
                      <TeamComponent team={match.team1} isClickable={false} />
                      <StyledP>vs</StyledP>
                      <TeamComponent team={match.team2} isClickable={false} />
                    </StyledMatch>
                  );
                })}
              </StyledUl>
            );
          })}
      </StyledMatchWrapperSection>
      <Navigation />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  height: 100dvh;
  width: 100dvw;
  padding: 0;
  font-size: 20px;
  font-family: baloo_2;
  position: relative;
  overflow: hidden;
`;

const StyledUl = styled.ul`
  list-style-type: none;
`;

const StyledP = styled.p`
  color: white;
  margin-left: 1rem;
`;

const StyledMatchWrapperSection = styled.section`
  overflow-y: scroll;
  border: 1px solid white;
  height: 65dvh;
  width: 100dvw;
  margin-top: -1rem;
`;

const StyledMatch = styled.li`
  position: relative;
  width: 100vw;
  margin-top: 1rem;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;