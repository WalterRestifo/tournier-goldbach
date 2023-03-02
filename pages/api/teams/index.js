import dbConnect from "../../../db/dbConnect";
import Team from "../../../db/models/Team";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const teams = await Team.find();
      const teamsArray = teams.map((team) => {
        return {
          players: team.players,
          wins: team.wins,
          games: team.games,
          id: team._id,
          points: team.points,
        };
      });

      res.status(200).json(teamsArray);
    } catch (error) {
      res.status(404).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;

      const newTeam = await Team.create(data);

      return res.status(201).json(newTeam);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
