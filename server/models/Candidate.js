import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: false },
  constituency: { type: String },
  votes: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ["Pending", "Approved"], 
    default: "Pending" 
  },
});

export default mongoose.model("Candidate", candidateSchema);
