import dbConnect from "../../../db/dbConnect";
import Team from "../../../db/models/Team";

export default async function handler(req, res) {
  await dbConnect();
  const id = req.query.id;
  const method = req.method;

  if (method === "GET") {
    try {
      const team = await Team.findById(id);

      res.status(200).json({
        id: team._id,
        wins: team.wins,
        games: team.games,
        players: team.players,
        points: team.points,
      });
    } catch (error) {
      res.status(404).json(error);
    }
  } else if (method === "DELETE") {
    const team = await Team.findByIdAndDelete(id);
    if (team) {
      res.status(200).json({ message: "Team deleted" });
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  } else if (method === "PUT") {
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        players: req.body.players,
        points: req.body.points,
        wins: req.body.wins,
        games: req.body.games,
      },
      { returnDocument: "after" }
    );
    if (updatedTeam) {
      res.status(200).json(updatedTeam);
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  }
}
