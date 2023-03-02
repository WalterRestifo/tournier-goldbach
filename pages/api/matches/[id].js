import dbConnect from "../../../db/dbConnect";
import Match from "../../../db/models/Match";

export default async function handler(req, res) {
  await dbConnect();
  const id = req.query.id;
  const method = req.method;

  if (method === "GET") {
    try {
      const match = await Match.findById(id);

      res.status(200).json({
        id: match._id,
        team1: match.team1,
        team2: match.team2,
        winner: match.winner,
      });
    } catch (error) {
      res.status(404).json(error);
    }
  }
  if (method === "DELETE") {
    const match = await Match.findByIdAndDelete(id);
    if (match) {
      res.status(200).json({ message: "Match deleted" });
    } else {
      res.status(404).json({ message: "Match not found" });
    }
  }
}
