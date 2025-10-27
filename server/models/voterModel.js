import mongoose from "mongoose";

const voterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    aadhaar: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    fingerprintId: { type: String, default: null },
    biometricStatus: {
      type: String,
      enum: ["not_verified", "partial", "verified"],
      default: "not_verified",
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Voter", voterSchema);
