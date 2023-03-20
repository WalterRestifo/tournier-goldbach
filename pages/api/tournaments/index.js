import dbConnect from "../../../db/dbConnect";
import Tournament from "../../../db/models/Tournament";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const tournament = await Tournament.findOne({ name: "Goldbach" }).exec();
      const tournamentData = {
        name: tournament.name,
        id: tournament._id,
        rounds: tournament.rounds,
      };

      res.status(200).json(tournamentData);
    } catch (error) {
      res.status(404).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;

      const newTournament = await Tournament.create(data);

      return res.status(201).json(newTournament);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
