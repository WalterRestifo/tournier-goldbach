import mongoose from "mongoose";

const { Schema } = mongoose;

const roundSchema = new Schema({
  Matches: { type: Object, required: true },
  winners: [],
});

const Round = mongoose.models.Round || mongoose.model("Round", roundSchema);

export default Round;
