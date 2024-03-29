import type { AppProps } from "next/app";

import { useState, useEffect } from "react";
import { Criteria } from "../interfaces/interfaces";
import { Member } from "../interfaces/interfaces";

export default function App({ Component, pageProps }: AppProps) {
  const [desiredPlayer, setDesiredPlayer] = useState<Criteria>({
    skill: "Anything will do",
    language: "Anything will do",
    gender: "Anything will do",
    name: "",
  });
  const [allPlayers, setAllPlayers] = useState<Member[]>([]);
  const [rounds, setRounds] = useState([]);
  const [loserRounds, setLoserRounds] = useState([]);

  async function getAllPlayers(): Promise<void> {
    try {
      const response = await fetch("/api/players");
      if (!response.ok) {
        return console.error(
          "Error with the response of the players fetch. Response status: ",
          response.status
        );
      } else {
        const listOfAllPlayers = await response.json();
        setAllPlayers(listOfAllPlayers);
      }
    } catch (error) {
      console.error("Something went wrong with the players fetch: ", error);
    }
  }

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <Component
      {...pageProps}
      desiredPlayer={desiredPlayer}
      setDesiredPlayer={setDesiredPlayer}
      allPlayers={allPlayers}
      setAllPlayers={setAllPlayers}
      rounds={rounds}
      setRounds={setRounds}
      loserRounds={loserRounds}
      setLoserRounds={setLoserRounds}
    />
  );
}
