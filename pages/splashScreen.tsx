import styled from "styled-components";
import Image from "next/image";

export default function SplashScreen(): JSX.Element {
  return (
    <StyledSplashScreen>
      <StyledImage>
        <Image
          src={"/logoMatchball.svg"}
          alt="logo of Matchball"
          width={350}
          height={350}
        />
      </StyledImage>
      <h1>Loading...</h1>
    </StyledSplashScreen>
  );
}

const StyledSplashScreen = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  z-index: 5;
`;

const StyledImage = styled.div`
  position: absolute;
  bottom: 37vh;
  left: 8vw;
`;
