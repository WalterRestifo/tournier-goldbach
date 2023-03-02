import Head from "next/head";
import Header from "../components/Header";
import styled from "styled-components";
import Link from "next/link";
import MiniCard from "../components/MiniCard";
import { useEffect, useState } from "react";
import { MiniPlayer, Team } from "../interfaces/interfaces";
import updateTeam from "../utils/updateTeam";
import Image from "next/image";

export default function ScoreForm(): JSX.Element {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [team1, setTeam1] = useState<Team>({
    players: [],
    points: 0,
    wins: 0,
    games: 0,
    id: "",
  });
  const [team2, setTeam2] = useState<Team>({
    players: [],
    points: 0,
    wins: 0,
    games: 0,
    id: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const team1FromLocalStorage = localStorage.getItem("team1");
      if (team1FromLocalStorage) {
        setTeam1(JSON.parse(team1FromLocalStorage));
      }

      const team2FromLocalStorage = localStorage.getItem("team2");
      if (team2FromLocalStorage) {
        setTeam2(JSON.parse(team2FromLocalStorage));
      }
    }
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const form = event.currentTarget;
    const pointsTeam1 = parseInt(form.elements.pointsTeam1.value);
    const pointsTeam2 = parseInt(form.elements.pointsTeam2.value);
    setIsSubmitted(true);
    const team1Obj = team1;
    const team2Obj = team2;
    let winner = "";
    if (pointsTeam1 > pointsTeam2) {
      team1Obj.wins += 1;
      winner = "Team 1";
    } else if (pointsTeam1 < pointsTeam2) {
      team2Obj.wins += 1;
      winner = "Team 2";
    } else {
      return alert("Please enter a valid score");
    }
    team1Obj.games += 1;
    team2Obj.games += 1;
    team1Obj.points += pointsTeam1;
    team2Obj.points += pointsTeam2;

    async function postMatch(match: object) {
      try {
        await fetch("/api/matches", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(match),
        });
      } catch (error) {
        console.error(
          "Something went wrong with the post fetch of a matches in /scoreForm: ",
          error
        );
      }
    }
    postMatch({ team1: team1Obj, team2: team2Obj, winner: winner });

    async function updateTeams() {
      updateTeam(team1Obj);
      updateTeam(team2Obj);
    }
    updateTeams();
  }

  return (
    <StyledDiv>
      <Image
        src={"/scoreImageOrange.jpg"}
        alt={"volleyball game background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
      <Header teaser={"Scores"} />
      <StyledForm onSubmit={handleSubmit} data-cy="scoreForm">
        <StyledFormDiv>
          <StyledTeamWrapper data-cy="team-1-wrapper">
            <StyledP>Team 1</StyledP>
            {team1 &&
              team1.players.length > 0 &&
              team1.players.map((player: MiniPlayer) => {
                return (
                  <MiniCard
                    key={player.name + player.cloudinarySrc}
                    name={player.name}
                    cloudinarySrc={player.cloudinarySrc}
                  />
                );
              })}

            <label htmlFor="pointsTeam1">
              {"Points: "}
              <StyledInput
                type="number"
                name="pointsTeam1"
                id="pointsTeam1"
                data-cy="team-1-score-input"
                maxLength={2}
                aria-label="points for Team 1"
              />
            </label>
          </StyledTeamWrapper>

          <p>VS</p>

          <StyledTeamWrapper data-cy="team-2-wrapper">
            <StyledP>Team 2</StyledP>
            {team2 &&
              team2.players.map((player: MiniPlayer) => {
                return (
                  <MiniCard
                    key={player.name + player.cloudinarySrc}
                    name={player.name}
                    cloudinarySrc={player.cloudinarySrc}
                  />
                );
              })}
            <label htmlFor="pointsTeam2">
              {"Points: "}
              <StyledInput
                type="number"
                name="pointsTeam2"
                id="pointsTeam2"
                data-cy="team-2-score-input"
                maxLength={2}
                aria-label="points for Team 2"
              />
            </label>
          </StyledTeamWrapper>
        </StyledFormDiv>

        {!isSubmitted && (
          <StyledButton
            type="submit"
            data-cy="submit-scoreForm"
            aria-label="submit score form"
          >
            <Image
              src="/checkmark.svg"
              alt="checkmark"
              width={60}
              height={60}
            />
          </StyledButton>
        )}
      </StyledForm>
      <StyledNav>
        <StyledLink href={"/games"} data-cy="back-to-games-page-navigation">
          <Image
            src="/arrow-back.svg"
            alt="arrow back"
            width={60}
            height={60}
          />
        </StyledLink>
      </StyledNav>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  height: 100dvh;
  padding: 0;
  font-family: baloo_2;
  font-size: 20px;
  color: white;
  position: relative;
  overflow: hidden;
`;

const StyledForm = styled.form`
  margin-left: 2rem;
  margin-right: 2rem;
`;

const StyledFormDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledP = styled.p`
  text-align: center;
`;

const StyledInput = styled.input`
  width: 2rem;
  height: 2rem;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: left;
  position: fixed;
  bottom: 0;
  left: 7%;
  width: 100vw;
`;

const StyledTeamWrapper = styled.div`
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  top: 3.5rem;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  position: fixed;
  bottom: 0.6rem;
  left: 42%;
  z-index: 1;
  transition: scale 0.15s ease;

  :active {
    scale: 1.1;
  }
`;

const StyledLink = styled(Link)`
  transition: scale 0.15s ease;

  :active {
    scale: 1.1;
    -webkit-tap-highlight-color: transparent;
  }
`;
