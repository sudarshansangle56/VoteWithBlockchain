import mongoose from "mongoose";

const partySchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String },
  leader: { type: String },
  color: { type: String },
});

export default mongoose.model("Party", partySchema);
