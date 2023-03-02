import dbConnect from "../../../db/dbConnect";
import Player from "../../../db/models/Player";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const players = await Player.find();
      const playersArray = players.map((player) => {
        return {
          name: player.name,
          id: player._id,
          skill: player.skill,
          languages: player.languages,
          gender: player.gender,
          cloudinarySrc: player.cloudinarySrc,
        };
      });

      res.status(200).json(playersArray);
    } catch (error) {
      res.status(404).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;

      const newPlayer = await Player.create(data);

      return res.status(201).json(newPlayer);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
