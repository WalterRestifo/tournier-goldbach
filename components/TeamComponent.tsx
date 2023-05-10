import React, { useState } from "react";
import styled from "styled-components";
import { MiniPlayer, Team } from "../interfaces/interfaces";
import MiniCard from "./MiniCard";

type TeamProps = {
  team: Team;
  isClickable: boolean;
  showPoints: boolean;
};

export default function TeamComponent({
  team,
  isClickable,
  showPoints,
}: TeamProps): JSX.Element {
  const [isClicked, setIsClicked] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const pointsInput = e.target;
    team.points = parseInt(pointsInput.value);
  }

  return (
    <StyledTeam
      key={team.id}
      onClick={(e: any) => {
        setIsClicked(!isClicked);
        e.stopPropagation();
      }}
    >
      <div>
        {team.players !== undefined &&
          team.players.map((player: MiniPlayer) => (
            <MiniCard key={player.name} name={player.name} />
          ))}
      </div>
      <StyledDataWrapper>
        {isClickable && isClicked ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Punkte:{" "}
              <StyledInput
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                  e.stopPropagation();
                }}
                onChange={handleChange}
                type={"number"}
                maxLength={2}
                name="points"
                autoFocus
                placeholder={`${team.points}`}
              ></StyledInput>
            </label>
          </form>
        ) : showPoints ? (
          <StyledP>Punkte: {team.points}</StyledP>
        ) : (
          <p>Glückwunsch für den Sieg!</p>
        )}
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
  flex-direction: column;
  flex-wrap: no-wrap;
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

const StyledInput = styled.input`
  width: 2rem;
  height: 1rem;
`;
