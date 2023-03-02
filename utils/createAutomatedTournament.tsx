export function createAutomatedTournament(teams: []) {
  let matches = [];
  for (let i = 0; i < teams.length; i += 2) {
    const match = [teams[i], teams[i + 1]];
    matches.push(match);
  }
  return matches;
}

module.exports = createAutomatedTournament;
