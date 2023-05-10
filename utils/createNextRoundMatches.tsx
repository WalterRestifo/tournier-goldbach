import { Team } from "../interfaces/interfaces";

export default function createNextRoundMatches(teams: Team[]) {
  let matches = [];

  for (let i = 0; i < teams.length; i += 2) {
    const match = {
      team1: { ...teams[i], points: 0 },
      team2: { ...teams[i + 1], points: 0 },
    };
    matches.push(match);
  }
  return matches;
}
