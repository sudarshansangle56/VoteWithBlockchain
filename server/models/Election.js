import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["National", "State", "Local"], required: true },
  status: { type: String, enum: ["Scheduled", "Active", "Completed"], default: "Scheduled" },
  startDate: { type: String },
  endDate: { type: String },
  totalVotes: { type: Number, default: 0 },
});

export default mongoose.model("Election", electionSchema);
