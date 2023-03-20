export default async function postRound(
  roundsArray: any[][],
  nameOfTournament: String
): Promise<void> {
  try {
    const data = { name: nameOfTournament, rounds: roundsArray };
    await fetch("/api/tournaments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(
      "Something went wrong with the post fetch of the round: ",
      error
    );
  }
}
