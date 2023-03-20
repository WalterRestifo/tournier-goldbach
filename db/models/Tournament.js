import mongoose from "mongoose";

const { Schema } = mongoose;

const tournamentSchema = new Schema({
  name: { type: String },
  rounds: [],
});

const Tournament =
  mongoose.models.Tournament || mongoose.model("Tournament", tournamentSchema);

export default Tournament;
