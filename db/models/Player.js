import mongoose from "mongoose";

const { Schema } = mongoose;

const playerSchema = new Schema({
  name: { type: String, required: true },
  tournaments: [String],
});

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
