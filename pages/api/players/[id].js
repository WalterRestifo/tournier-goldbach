import dbConnect from "../../../db/dbConnect";
import Player from "../../../db/models/Player";

export default async function handler(req, res) {
  await dbConnect();
  const id = req.query.id;
  const method = req.method;

  if (method === "GET") {
    try {
      const player = await Player.findById(id);

      res.status(200).json({
        id: player._id,
        name: player.name,
        skill: player.skill,
        gender: player.gender,
        languages: player.languages,
        cloudinarySrc: player.cloudinarySrc,
      });
    } catch (error) {
      res.status(404).json(error);
    }
  }
  if (method === "DELETE") {
    const player = await Player.findByIdAndDelete(id);
    if (player) {
      res.status(200).json({ message: "Player deleted" });
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  }
}
