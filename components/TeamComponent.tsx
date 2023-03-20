import React, { useState } from "react";
import styled from "styled-components";
import { MiniPlayer, Team } from "../interfaces/interfaces";
import MiniCard from "./MiniCard";

type TeamProps = {
  team: Team;
  isClickable: boolean;
};

export default function TeamComponent({
  team,
  isClickable,
}: TeamProps): JSX.Element {
  const [isClicked, setIsClicked] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.currentTarget;
    team.points = parseInt(form.elements.points.value);
  }

  return (
    <StyledTeam
      key={team.id}
      onClick={(e) => {
        setIsClicked(!isClicked);
        e.stopPropagation();
        return;
      }}
    >
      <div>
        {team.players.map((player: MiniPlayer) => (
          <MiniCard key={player.name} name={player.name} />
        ))}
      </div>
      <StyledDataWrapper>
        {isClickable && isClicked ? (
          <form onSubmit={handleSubmit}>
            <label>
              Punkte:{" "}
              <StyledInput
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  e.stopPropagation()
                }
                type={"number"}
                maxLength={2}
                name="points"
                placeholder={`${team.points}`}
              ></StyledInput>
            </label>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                e.stopPropagation()
              }
            >
              Bestätigen
            </button>
          </form>
        ) : (
          <StyledP>Punkte: {team.points}</StyledP>
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

const StyledInput = styled.input`
  width: 2rem;
  height: 1rem;
`;
