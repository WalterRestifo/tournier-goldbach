import styled from "styled-components";

type CardProps = {
  name: string;
};

export default function MiniCard({ name }: CardProps): JSX.Element {
  return (
    <StyledDiv>
      <StyledP>{name}</StyledP>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  font-size: 1.25rem;
  color: white;
  padding-bottom: 0;
  color: inherit;
  text-decoration: none;
  border-radius: 10px;
`;

const StyledP = styled.p`
  color: white;
`;
