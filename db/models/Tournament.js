import mongoose from "mongoose";

const { Schema } = mongoose;

const tournamentSchema = new Schema({
  Matches: { type: Object, required: true },
  name: { type: String, required: true },
});

const Tournament =
  mongoose.models.Tournament || mongoose.model("Tournament", tournamentSchema);

export default Tournament;
