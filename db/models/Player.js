import mongoose from "mongoose";

const { Schema } = mongoose;

const playerSchema = new Schema({
  name: { type: String, required: true },
  skill: { type: String, required: true },
  languages: [String],
  gender: { type: String, required: true },
  cloudinarySrc: { type: String, required: true },
});

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
