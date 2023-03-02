import Header from "../components/Header";
import styled from "styled-components";
import { tournament } from "../data/data";
import Link from "next/link";
import { useState } from "react";
import { ownPlayerCard } from "../data/data";
import Image from "next/image";

export default function NewUserForm(): JSX.Element {
  const [checkedState, setCheckedState] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  ownPlayerCard.tournaments = [];

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    ownPlayerCard.name = event.currentTarget.username.value;
    const languageArray = [...ownPlayerCard.tournaments];

    checkedState.map((languageIsChecked, index) => {
      if (languageIsChecked === true && index == 0) {
        languageArray.push("Herren");
      }
      if (languageIsChecked === true && index == 1) {
        languageArray.push("Mixed");
      }
      if (languageIsChecked === true && index == 2) {
        languageArray.push("Frauen");
      }
      ownPlayerCard.tournaments = languageArray;
      console.log(ownPlayerCard);
    });

    try {
      await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ownPlayerCard),
      });
    } catch (error) {
      console.error("Something went wrong with the fetch: ", error);
    }

    setIsSubmitted(true);
  }

  function handleCheckboxStateChange(indexOfTheCheckbox: number): void {
    const updatedCheckedState = checkedState.map(
      (languageCheckedState, index) =>
        index === indexOfTheCheckbox
          ? !languageCheckedState
          : languageCheckedState
    );
    setCheckedState(updatedCheckedState);
  }

  return (
    <StyledNewUserFormDiv>
      <Image
        src={"/beachspielerin.jpg"}
        alt={"female beachvolleyball player background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
      <Header teaser={"New Player"} />
      <StyledMain data-cy="new-user-form-main-element">
        <StyledDropdownMenuWrapper>
          <StyledForm onSubmit={handleSubmit}>
            <label htmlFor="username">Your name (max 10 characters):</label>
            <input
              name="username"
              id="username"
              maxLength={10}
              placeholder="Your name"
              data-cy="username-input"
              required
            />

            <p>An welchen Turniere nimmt der Spieler teil?:</p>
            {tournament.map((tournament, index) => {
              return (
                <label key={tournament + index}>
                  {tournament + " " + " "}
                  <input
                    type={"checkbox"}
                    name="tournament"
                    id={tournament + index}
                    value={tournament}
                    onChange={() => handleCheckboxStateChange(index)}
                  />
                </label>
              );
            })}
            {!isSubmitted && (
              <StyledSubmitButton data-cy="submit-newUserForm">
                Hochladen
              </StyledSubmitButton>
            )}
          </StyledForm>
        </StyledDropdownMenuWrapper>
        <StyledP>
          {isSubmitted && "Your profile was created successfully!"}
        </StyledP>
        <StyledLink data-cy="back-to-homepage-navigation" href={"/players"}>
          <Image
            alt="Home"
            src="/webpagehome-white.svg"
            height={55}
            width={55}
          />
        </StyledLink>
      </StyledMain>
    </StyledNewUserFormDiv>
  );
}

const StyledNewUserFormDiv = styled.div`
  height: 100dvh;
  font-family: baloo_2;
  font-size: 20px;
  overflow: hidden;
`;

const StyledDropdownMenuWrapper = styled.section`
  color: white;
  margin-top: 5dvh;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  gap: 1rem;
`;

const StyledMain = styled.main`
  margin-left: 2rem;
  margin-right: 2rem;
`;

const StyledSubmitButton = styled.button`
  height: 7dvh;
  width: 30dvw;
  border-radius: 25px;
  border-color: white;
  color: white;
  background-color: transparent;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(5px);
`;

const StyledLink = styled(Link)`
  position: relative;
  bottom: 9dvh;
  left: 7%;
  height: 10dvh;
  width: 30dvw;
  border-radius: 25px;
  transition: scale 0.15s ease;

  :active {
    scale: 1.1;
    -webkit-tap-highlight-color: transparent;
  }
`;

const StyledP = styled.p`
  color: white;
  font-size: 20px;
  position: fixed;
  bottom: 1%;
  left: 38%;
`;
