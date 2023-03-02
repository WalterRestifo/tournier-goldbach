import { Team } from "../interfaces/interfaces";

export default async function postTeam(team: Team): Promise<void> {
  try {
    await fetch("/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    });
  } catch (error) {
    console.error(
      "Something went wrong with the matches in /games fetch: ",
      error
    );
  }
}
