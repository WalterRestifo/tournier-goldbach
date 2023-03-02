import mongoose from "mongoose";

const { Schema } = mongoose;

const teamSchema = new Schema({
  players: [],
  wins: { type: Number },
  games: { type: Number },
  points: { type: Number },
  id: { type: String },
  name: { type: String },
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
