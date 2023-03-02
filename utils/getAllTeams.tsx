export default async function getAllTeams(): Promise<any> {
  try {
    const response = await fetch("/api/teams");
    if (!response.ok) {
      return console.error(
        "Error with the response of the teams fetch. Response status: ",
        response.status
      );
    } else {
      const listOfAllTeams = await response.json();
      return listOfAllTeams;
    }
  } catch (error) {
    console.error("Something went wrong with the matches fetch: ", error);
  }
}
