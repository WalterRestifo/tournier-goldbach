import Header from "../components/Header";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

import ArrowNavigation from "../components/arrowNavigation";

export default function Plan() {
  const [tournament, setTournament] = useState("");

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setTournament(e.currentTarget.value);
  }

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
      <Header teaser="plan your tournament" />
      <main>
        <StyledForm>
          <StyledP>
            {tournament === ""
              ? ""
              : tournament === "royalsOfTheBeach"
              ? "the classical royals of the beach"
              : tournament === "singleElimination"
              ? "single elimination"
              : tournament === "doubleElimination"
              ? "double elimination"
              : tournament === "divisionalPlay"
              ? "divisional play"
              : ""}
          </StyledP>
          <label>
            <StyledInput
              type={"radio"}
              value={"royalsOfTheBeach"}
              name={"tournamentType"}
              onChange={(e) => handleChange(e)}
            />

            <StyledLabelText>Royals of the beach</StyledLabelText>
          </label>
          <label>
            <StyledInput
              type={"radio"}
              value={"singleElimination"}
              name={"tournamentType"}
              onChange={(e) => handleChange(e)}
            />

            <StyledLabelText>Single elimination</StyledLabelText>
          </label>
          <label>
            <StyledInput
              type={"radio"}
              value={"doubleElimination"}
              name={"tournamentType"}
              onChange={(e) => handleChange(e)}
            />

            <StyledLabelText>Double elimination</StyledLabelText>
          </label>
          <label>
            <StyledInput
              type={"radio"}
              value={"divisionalPlay"}
              name={"tournamentType"}
              onChange={(e) => handleChange(e)}
            />

            <StyledLabelText>Divisional play</StyledLabelText>
          </label>
        </StyledForm>
      </main>
      <ArrowNavigation
        hrefBackward="/competitions"
        hrefForward={`/${tournament}`}
        hrefPlus={""}
        displayPlus={false}
      />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  height: 100dvh;
  width: 100dvw;
  padding: 0;
  font-size: 20px;
  font-family: baloo_2;
  position: relative;
  overflow: hidden;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 7dvh;
  height: 75dvh;
`;

const StyledP = styled.p``;

const StyledInput = styled.input`
  display: hidden;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
`;

const StyledLabelText = styled.span`
  color: white;
  transition-property: font-size;
  transition-duration: 0.7s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;

  ${StyledInput}:checked + && {
    font-size: 2.5rem;
  }
`;
