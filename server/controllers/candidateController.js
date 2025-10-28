import Candidate from "../models/Candidate.js";

// Get all candidates
export const getCandidates = async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
};

// Create candidate
export const createCandidate = async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    console.error("Error creating candidate:", error.message);
    res.status(400).json({ message: "Failed to create candidate" });
  }
};

// Update candidate
export const updateCandidate = async (req, res) => {
  const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete candidate
export const deleteCandidate = async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.json({ message: "Candidate deleted" });
};
