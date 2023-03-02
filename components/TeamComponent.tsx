import styled from "styled-components";
import { MiniPlayer, Team } from "../interfaces/interfaces";
import { useState } from "react";
import MiniCard from "./MiniCard";

type TeamProps = {
  team: Team;
  isClickable: boolean;
};

export default function TeamComponent({ team }: TeamProps): JSX.Element {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <StyledTeam onClick={() => setIsSelected(!isSelected)} key={team.id}>
      <StyledMiniCardWrapper>
        {team.players.map((player: MiniPlayer) => (
          <MiniCard key={player.name} name={player.name} />
        ))}
      </StyledMiniCardWrapper>
      <StyledDataWrapper>
        <StyledP>Points: {team.points}</StyledP>
      </StyledDataWrapper>
    </StyledTeam>
  );
}

const StyledTeam = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const StyledP = styled.p`
  color: white;
`;

const StyledDataWrapper = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledMiniCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
`;

const StyledButton = styled.button`
  height: 7vh;
  width: 26.7vw;
  border-radius: 25px;
  font-family: baloo_2;
  font-size: 20px;
  color: white;
  /* background-color: transparent; */
  border-color: white;
  margin-bottom: 0.5rem;

  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(5px);
`;
