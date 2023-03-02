import Image from "next/image";
import styled from "styled-components";
import React from "react";

export default function Footer(): JSX.Element {
  return (
    <StyledFooter>
      Powered by WR and{" "}
      <StyledSpan>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </StyledSpan>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: sticky;
  bottom: 0;
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
`;

const StyledSpan = styled.span`
  height: 1em;
  margin-left: 0.5rem;
`;
