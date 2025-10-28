import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString().split("T")[0] },
  sent: { type: Boolean, default: false },
});

export default mongoose.model("Notification", notificationSchema);
