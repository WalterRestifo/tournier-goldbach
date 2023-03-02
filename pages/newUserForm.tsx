import Header from "../components/Header";
import styled from "styled-components";
import DropdownMenu from "../components/DropdownMenu";
import { skill, language, gender } from "../data/data";
import Link from "next/link";
import { useState } from "react";
import { ownPlayerCard } from "../data/data";
import Image from "next/image";

export default function NewUserForm(): JSX.Element {
  const skillOptions = skill.slice(1);
  const languageOptions = language.slice(1);
  const genderOptions = gender.slice(1);
  const [checkedState, setCheckedState] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  ownPlayerCard.languages = [];

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    ownPlayerCard.name = event.currentTarget.username.value;
    const languageArray = [...ownPlayerCard.languages];

    checkedState.map((languageIsChecked, index) => {
      if (languageIsChecked === true && index == 0) {
        languageArray.push("English");
      }
      if (languageIsChecked === true && index == 1) {
        languageArray.push("German");
      }
      if (languageIsChecked === true && index == 2) {
        languageArray.push("Spanish");
      }
      ownPlayerCard.languages = languageArray;
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
      ownPlayerCard.cloudinarySrc =
        "https://res.cloudinary.com/doryasyte/image/upload/v1671547911/MatchBall/profiles/s9ijhqdwo9xa3gfdwi4x.jpg";
    } catch (error) {
      console.error("Something went wrong with the fetch: ", error);
    }

    setIsSubmitted(true);
    event.currentTarget.username.focus();
  }

  function handleChangeSkill(criteria: string, value: string): void {
    ownPlayerCard.skill = value;
  }

  function handleChangeGender(criteria: string, value: string): void {
    ownPlayerCard.gender = value;
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
            <StyledUploadLabel htmlFor="uploadButton">
              upload your profile picture:
            </StyledUploadLabel>
            <StyledUploadButton id="uploadButton">
              <Link href="imageUpload">
                <Image
                  alt="cloud upload"
                  src="/cloudUpload.svg"
                  height={40}
                  width={40}
                />
              </Link>
            </StyledUploadButton>

            <label htmlFor="username">Your name (max 10 characters):</label>
            <input
              name="username"
              id="username"
              maxLength={10}
              placeholder="Your name"
              data-cy="username-input"
              required
            />
            <DropdownMenu
              dataCy={"skill-select-new-user"}
              options={skillOptions}
              criteria={"skill"}
              onChange={handleChangeSkill}
            />
            <DropdownMenu
              dataCy={"gender-select-new-user"}
              options={genderOptions}
              criteria={"gender"}
              onChange={handleChangeGender}
            />
            <p>Choose your languages:</p>
            {languageOptions.map((language, index) => {
              return (
                <label key={language + index}>
                  {language + " " + " "}
                  <input
                    type={"checkbox"}
                    name="language"
                    id={language + index}
                    value={language}
                    onChange={() => handleCheckboxStateChange(index)}
                  />
                </label>
              );
            })}
            {!isSubmitted && (
              <StyledSubmitButton data-cy="submit-newUserForm">
                Submit
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

const StyledUploadLabel = styled.label`
  text-align: center;
`;

const StyledUploadButton = styled.button`
  border-radius: 25px;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  border-color: white;
  color: white;
  background-color: transparent;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(5px);
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
