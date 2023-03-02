export default async function removeTeam(id: string) {
  await fetch("./api/teams/" + id, {
    method: "DELETE",
  });
}
