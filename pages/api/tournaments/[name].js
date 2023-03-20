import dbConnect from "../../../db/dbConnect";
import Tournament from "../../../db/models/Tournament";

export default async function handler(req, res) {
  await dbConnect();
  const name = req.query.name;
  const method = req.method;

  if (method === "GET") {
    try {
      const tournament = await Tournament.findOne(name);

      res.status(200).json({
        id: tournament._id,
        name: tournament.name,
        rounds: tournament.rounds,
      });
    } catch (error) {
      res.status(404).json(error);
    }
  } else if (method === "DELETE") {
    const tournament = await Tournament.findOneAndDelete(name);
    if (tournament) {
      res.status(200).json({ message: "Tournament deleted" });
    } else {
      res.status(404).json({ message: "Tournament not found" });
    }
  } else if (method === "PUT") {
    const updatedTournament = await Tournament.findOneAndUpdate(
      name,
      {
        rounds: req.body.rounds,
      },
      { returnDocument: "after" }
    );
    if (updatedTournament) {
      res.status(200).json(updatedTournament);
    } else {
      res.status(404).json({ message: "Tournament not found" });
    }
  }
}
