import dbConnect from "../../../db/dbConnect";
import Match from "../../../db/models/Match";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const matches = await Match.find();
      const matchesArray = matches.map((match) => {
        return {
          team1: match.team1,
          team2: match.team2,
          id: match._id,
          winner: match.winner,
        };
      });

      res.status(200).json(matchesArray);
    } catch (error) {
      res.status(404).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;

      const newMatch = await Match.create(data);

      return res.status(201).json(newMatch);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
