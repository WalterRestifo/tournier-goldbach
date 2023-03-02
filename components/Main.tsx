import Card from "../components/Card";
import styled from "styled-components";
import { Criteria, Member } from "../interfaces/interfaces";

type MainProps = {
  desiredPlayer: Criteria;
  setDesiredPlayer: any;
  allPlayers: Member[];
  setAllPlayers: any;
  isSelectable: boolean;
};
export default function Main({
  desiredPlayer,
  setDesiredPlayer,
  allPlayers,
  isSelectable,
}: MainProps): JSX.Element {
  const matchedPlayers: Member[] = allPlayers
    ?.filter((player: Member) => {
      let desiredName = `${desiredPlayer.name.toLowerCase()}`;
      let regex = new RegExp("^" + desiredName);
      return player.name.toLowerCase().match(regex) || !desiredPlayer.name;
    })
    .reverse();

  function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    setDesiredPlayer({ ...desiredPlayer, name: e.currentTarget.value });
  }

  return (
    <StyledMain>
      <StyledDropdownMenuWrapper>
        <StyledForm data-cy="selection-form">
          <label>
            name
            <StyledInput
              type={"text"}
              placeholder={" of the desired player"}
              onChange={handleSearch}
            />
          </label>
        </StyledForm>
      </StyledDropdownMenuWrapper>
      <StyledCardsWrapperSection data-cy="player-list">
        {matchedPlayers?.map(({ name, tournaments, id }) => {
          return (
            <Card
              key={name}
              name={name}
              tournaments={tournaments}
              id={id}
              isSelectable={isSelectable}
            />
          );
        })}
      </StyledCardsWrapperSection>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: grid;
  grid-template-rows: 8rem auto;

  overflow-y: scroll;
  height: 70dvh;
`;

const StyledCardsWrapperSection = styled.section`
  display: flex;
  overflow-x: scroll;
  border: 1px solid white;
  margin-top: 5dvh;
`;

const StyledDropdownMenuWrapper = styled.section`
  padding-left: 25dvw;
  padding-right: 3.1rem;
  height: fit-content;

  color: white;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  margin: 3dvw;
`;
