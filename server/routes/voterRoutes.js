import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Voter from "../models/voterModel.js";

const router = express.Router();

/**
 * ✅ Register Voter (Biometric Optional)
 */
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      aadhaar,
      email,
      phone,
      dob,
      address,
      password,
      fingerprintId,
    } = req.body;

    // Check existing voter
    const voterExists = await Voter.findOne({ aadhaar });
    if (voterExists) {
      return res
        .status(400)
        .json({ success: false, message: "Voter already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create voter (even if fingerprint missing)
    const newVoter = await Voter.create({
      name,
      aadhaar,
      email,
      phone,
      dob,
      address,
      password: hashedPassword,
      fingerprintId: fingerprintId || null,
      biometricStatus: fingerprintId ? "partial" : "not_verified",
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newVoter._id, aadhaar: newVoter.aadhaar },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "Voter registered successfully",
      voter: {
        id: newVoter._id,
        name: newVoter.name,
        email: newVoter.email,
        biometricStatus: newVoter.biometricStatus,
      },
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/**
 * ✅ Login Voter
 */
router.post("/login", async (req, res) => {
  try {
    const { aadhaar, password } = req.body;

    const voter = await Voter.findOne({ aadhaar });
    if (!voter)
      return res.status(404).json({ success: false, message: "Voter not found" });

    const isMatch = await bcrypt.compare(password, voter.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: voter._id, aadhaar: voter.aadhaar },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      voter: {
        id: voter._id,
        name: voter.name,
        email: voter.email,
        biometricStatus: voter.biometricStatus,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/**
 * ✅ Protected Route Example
 */
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const voter = await Voter.findById(req.user.id).select("-password");
    res.json(voter);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Middleware for Token Verification
 */
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

export default router;
