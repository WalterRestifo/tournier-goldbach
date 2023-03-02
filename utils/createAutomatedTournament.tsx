const teams = [
  { players: [{ name: "Henk" }, { name: "Walter" }], points: 0, id: "" },
  { players: [{ name: "Jonas" }, { name: "Heike" }], points: 0, id: "" },
  { players: [{ name: "Susanne" }, { name: "Albrecht" }], points: 0, id: "" },
  { players: [{ name: "Andrea" }, { name: "Mehrnaz" }], points: 0, id: "" },
];

export function createAutomatedTournament(teams: []) {
  let matches = [[]];
  for (let i = 0; i <= teams.length; i += 2) {
    const match = [teams[i], teams[i + 1]];
    matches.push(match);
  }
  return matches;
}
