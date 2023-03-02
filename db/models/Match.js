import mongoose from "mongoose";

const { Schema } = mongoose;

const matchSchema = new Schema({
  team1: { type: Object, required: true },
  team2: { type: Object, required: true },
  winner: { type: String, required: true },
});

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default Match;
