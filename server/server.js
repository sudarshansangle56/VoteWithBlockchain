import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import voterRoutes from "./routes/voterRoutes.js";
import electionRoutes from "./routes/electionRoutes.js";
import partyRoutes from "./routes/partyRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Blockchain Voting Backend Running");
});

app.use("/api/voters", voterRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/parties", partyRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
