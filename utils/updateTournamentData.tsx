export default async function updateTournamentRounds(
  tournamentName: string,
  updatedRounds: any[][]
) {
  const updatedTournament = { name: tournamentName, rounds: updatedRounds };

  await fetch(`api/tournaments/${tournamentName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTournament),
  });
}
