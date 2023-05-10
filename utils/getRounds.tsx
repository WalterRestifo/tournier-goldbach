export default async function getRounds(tournamentName: string): Promise<any> {
  try {
    const response = await fetch(`/api/tournaments/${tournamentName}`);
    if (!response.ok) {
      return console.error(
        "Error with the response of the tournament fetch. Response status: ",
        response.status
      );
    } else {
      const tournament = await response.json();
      return tournament.rounds;
    }
  } catch (error) {
    console.error(error);
  }
}
