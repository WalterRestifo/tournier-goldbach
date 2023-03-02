import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

type ArrowNavigationProps = {
  hrefForward: string;
  hrefBackward: string;
  hrefPlus: string;
  displayPlus: boolean;
};

export default function ArrowNavigation({
  hrefForward,
  hrefBackward,
  hrefPlus,
  displayPlus,
}: ArrowNavigationProps) {
  return (
    <StyledNav>
      <StyledLink href={hrefBackward} aria-label="Back arrow">
        <Image src="/arrow-back.svg" alt="arrow back" width={50} height={50} />
      </StyledLink>
      {displayPlus && (
        <StyledLink href={hrefPlus} aria-label="Create">
          <Image
            src="/plus-rectangle_1.svg"
            alt="plus"
            width={50}
            height={50}
          />
        </StyledLink>
      )}

      <StyledLink
        href={hrefForward}
        data-cy="scoreForm-navigation"
        aria-label="Continue"
      >
        <Image
          src="/arrow-forward.svg"
          alt="arrow forwards"
          width={50}
          height={50}
        />
      </StyledLink>
    </StyledNav>
  );
}

const StyledLink = styled(Link)`
  height: 10vh;
  width: 30vw;
  padding-top: 0.2em;
  border-radius: 25px;
  transition: scale 0.15s ease;
  -webkit-tap-highlight-color: transparent;

  :active {
    scale: 1.1;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 7%;
  width: 100vw;
`;
