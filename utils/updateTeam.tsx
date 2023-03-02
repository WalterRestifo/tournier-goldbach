import { Team } from "../interfaces/interfaces";

export default async function updateTeam(team: Team) {
  await fetch("./api/teams/" + team.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });
}
