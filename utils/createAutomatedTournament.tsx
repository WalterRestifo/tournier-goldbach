import { nanoid } from "nanoid";
export default function createAutomatedTournament(teams: []) {
  let matches = [];

  for (let i = 0; i < teams.length; i += 2) {
    const match = {
      team1: teams[i],
      team2: teams[i + 1],
      id: nanoid(),
      winner: "",
    };
    matches.push(match);
  }
  return matches;
}

module.exports = createAutomatedTournament;
