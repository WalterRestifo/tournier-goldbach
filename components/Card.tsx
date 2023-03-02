import styled from "styled-components";
import { CldImage } from "next-cloudinary";
import { MiniPlayer } from "../interfaces/interfaces";
import { nanoid } from "nanoid";
import Image from "next/image";

type CardProps = {
  name: string;
  cloudinarySrc: string;
  languages: string[];
  gender: string;
  skill: string;
  id: string;
  isSelectable: boolean;
};

export default function Card({
  name,
  cloudinarySrc,
  languages,
  gender,
  skill,
  id,
  isSelectable,
}: CardProps): JSX.Element {
  function handleTeamSelection(
    e: React.MouseEvent<HTMLElement>,
    newPlayer: MiniPlayer
  ) {
    e.stopPropagation();
    const team = localStorage.getItem("newTeam");
    if (team) {
      const teamObj = JSON.parse(team);
      teamObj.players.push(newPlayer);
      localStorage.setItem("newTeam", JSON.stringify(teamObj));
    } else {
      const newTeam = {
        players: [newPlayer],
        points: 0,
        games: 0,
        wins: 0,
        id: nanoid(),
      };
      localStorage.setItem("newTeam", JSON.stringify(newTeam));
    }
  }

  async function handleDeletePlayer(id: string) {
    await fetch("./api/players/" + id, {
      method: "DELETE",
    });
  }

  const player = { name: name, cloudinarySrc: cloudinarySrc };
  return (
    <StyledDiv>
      <StyledCldImage
        width="100"
        height="120"
        src={cloudinarySrc}
        alt={name}
        priority={true}
      />

      <p>{name}</p>
      <p>{skill}</p>
      <p>{gender}</p>
      <StyledUl>
        {languages.map((language: string) => {
          return <li key={language}>{language}</li>;
        })}
      </StyledUl>
      <StyledDeleteButton
        data-cy="delete-user-button"
        onClick={() => handleDeletePlayer(id)}
      >
        delete player
      </StyledDeleteButton>
      {isSelectable && (
        <StyledAddToTeamButton
          aria-label="add to team"
          onClick={(e) => handleTeamSelection(e, player)}
        >
          <Image src="/plus.svg" alt="plus" width={30} height={30} />
        </StyledAddToTeamButton>
      )}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  font-size: 20px;
  line-height: 1.5;
  min-height: 317px;
  min-width: 200px;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  text-align: center;
  color: white;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  position: relative;

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const StyledDeleteButton = styled.button`
  display: none;
`;

const StyledUl = styled.ul`
  list-style: none;
`;

const StyledCldImage = styled(CldImage)`
  margin-top: 0.5em;
  border-radius: 25px;
`;

const StyledAddToTeamButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5rem;
  transition: scale 0.15s ease;
  z-index: 2;
  :active {
    scale: 2;
  }
`;
