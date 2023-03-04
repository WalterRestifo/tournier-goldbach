import dbConnect from "../../../db/dbConnect";
import Tournament from "../../../db/models/Tournament";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const tournaments = await Tournament.find();
      const tournamentsArray = tournaments.map((round) => {
        return {
          name: round.name,
          id: round._id,
          tournaments: round.tournaments,
        };
      });

      res.status(200).json(tournamentsArray);
    } catch (error) {
      res.status(404).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;

      const Tournament = await Tournament.create(data);

      return res.status(201).json(Tournament);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
