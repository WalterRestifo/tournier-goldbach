import Header from "../components/Header";
import { useState, useEffect } from "react";
import getAllTeams from "../utils/getAllTeams";
import { Team } from "../interfaces/interfaces";
import Image from "next/image";
import Team3To6Component from "../components/Team3To6Component";
import styled from "styled-components";
import ArrowNavigation from "../components/arrowNavigation";

export default function DoubleElimination() {
  const [teams, setTeams] = useState<[Team]>([
    { players: [], points: 0, id: "", wins: 0, games: 0 },
  ]);

  useEffect(() => {
    async function fetchTeamsAndUpdateTeamState() {
      const fetchedTeams = await getAllTeams();
      setTeams(fetchedTeams);
    }
    fetchTeamsAndUpdateTeamState();
  }, []);

  return (
    <StyledDiv>
      <Image
        src={"/playergroup.jpg"}
        alt={"Player group background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
      <Header teaser="Double elimination" />
      <section>
        <StyledUl data-cy="team-list">
          {teams.map((team) => {
            return (
              <li key={team.id}>
                <Team3To6Component team={team} isClickable={true} />
              </li>
            );
          })}
        </StyledUl>
      </section>
      <ArrowNavigation
        hrefBackward="/games"
        hrefForward="/scoreForm"
        hrefPlus="/teamChoiceForm"
        displayPlus={true}
      />
    </StyledDiv>
  );
}

const StyledUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;
  height: 70vh;
  width: 100vw;
`;

const StyledDiv = styled.div`
  height: 100dvh;
  width: 100dvw;
  padding: 0;
  font-size: 20px;
  font-family: baloo_2;
  overflow: hidden;
`;
