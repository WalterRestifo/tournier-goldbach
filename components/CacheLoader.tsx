import styled from "styled-components";
import Image from "next/image";

export default function CacheLoader() {
  return (
    <StyledcacheLoader>
      <Image
        src={"/scoreImageOrange.jpg"}
        alt={"volleyball game background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
      <Image
        src={"/beachspielerin.jpg"}
        alt={"female beachvolleyball player background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
      <Image
        src={"/playergroup.jpg"}
        alt={"Player group background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
      <Image
        src={"/netz-blur.jpg"}
        alt={"volleyball net background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
      <Image
        src={"/2players.jpg"}
        alt={"volleyball game background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
      <Image
        src={"/ball.jpg"}
        alt={"Ball background image"}
        fill={true}
        objectFit={"cover"}
        objectPosition={"center"}
        style={{ position: "absolute", zIndex: -1 }}
      />
    </StyledcacheLoader>
  );
}

const StyledcacheLoader = styled.div`
  display: none;
`;
