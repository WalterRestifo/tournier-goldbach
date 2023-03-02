import styled from "styled-components";
import { useRouter } from "next/router";

type HeaderProps = {
  teaser: string;
};

export default function Header({ teaser }: HeaderProps): JSX.Element {
  const router = useRouter();
  if (router.pathname === "/scoreForm") {
    return (
      <StyledOrangeHeader>
        <h1>MatchBall</h1>
        <StyledH2>{teaser}</StyledH2>
      </StyledOrangeHeader>
    );
  } else {
    return (
      <StyledHeader>
        <h1>MatchBall</h1>
        <StyledH2>{teaser}</StyledH2>
      </StyledHeader>
    );
  }
}

const StyledOrangeHeader = styled.header`
  text-align: center;
  padding-top: 10px;

  color: var(--strong-orange);
`;
const StyledHeader = styled.header`
  text-align: center;
  padding-top: 10px;

  color: white;
`;

const StyledH2 = styled.h2`
  position: relative;
  bottom: 17px;
  margin-bottom: -2dvh;
`;
