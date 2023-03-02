import { useEffect } from "react";
import { Member } from "../interfaces/interfaces";
import Header from "../components/Header";
import Link from "next/link";
import Main from "../components/Main";
import { Criteria } from "../interfaces/interfaces";
import postTeam from "../utils/postTeam";
import styled from "styled-components";
import Image from "next/image";

type TeamChoiceFormProps = {
  desiredPlayer: Criteria;
  setDesiredPlayer: any;
  allPlayers: Member[];
  setAllPlayers: any;
};

export default function TeamChoiceForm({
  desiredPlayer,
  setDesiredPlayer,
  allPlayers,
  setAllPlayers,
}: TeamChoiceFormProps): JSX.Element {
  useEffect(() => {
    localStorage.removeItem("newTeam");
  }, []);

  async function handlePostTeam() {
    const newTeam = localStorage.getItem("newTeam");
    if (newTeam) {
      const newTeamObj = JSON.parse(newTeam);
      postTeam(newTeamObj);
    }
  }

  useEffect(() => {
    async function rerenderPlayers() {
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
    }
    rerenderPlayers();
  }, []);

  return (
    <StyledDiv>
      <Image
        src={"/2players.jpg"}
        alt={"volleyball game background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
      <Header teaser={"Create a new team"} />
      <StyledMain>
        <Main
          desiredPlayer={desiredPlayer}
          setDesiredPlayer={setDesiredPlayer}
          allPlayers={allPlayers}
          setAllPlayers={setAllPlayers}
          isSelectable={true}
        />
      </StyledMain>
      <StyledNav>
        <StyledLink href={"/teamChoice"}>
          <Image
            src="/arrow-back.svg"
            alt="arrow back"
            width={50}
            height={50}
          />
        </StyledLink>

        <StyledButton onClick={handlePostTeam}>
          <StyledLink href={"/teamChoice"}>
            <Image
              src="/arrow-forward.svg"
              alt="arrow forward"
              width={50}
              height={50}
            />
          </StyledLink>
        </StyledButton>
      </StyledNav>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  height: 100dvh;
  width: 100dvw;
  overflow: hidden;
  font-family: baloo_2;
  font-size: 20px;
`;

const StyledLink = styled(Link)`
  height: 10vh;
  width: 30vw;
  padding-top: 0.2em;
  border-radius: 25px;
  transition: scale 0.15s ease;

  :active {
    scale: 1.1;
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const StyledMain = styled.main`
  margin-top: -0.8rem;
`;
