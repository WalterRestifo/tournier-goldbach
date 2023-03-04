import mongoose from "mongoose";

const { Schema } = mongoose;

const tournamentSchema = new Schema({
  rounds: mongoose.Mixed,
  name: { type: String, required: true },
});

const Tournament =
  mongoose.models.Tournament || mongoose.model("Tournament", tournamentSchema);

export default Tournament;
