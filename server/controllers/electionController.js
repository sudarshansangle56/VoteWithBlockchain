import Election from "../models/Election.js";

export const getElections = async (req, res) => {
  const elections = await Election.find();
  res.json(elections);
};

export const createElection = async (req, res) => {
  const newElection = new Election(req.body);
  await newElection.save();
  res.status(201).json(newElection);
};

export const updateElection = async (req, res) => {
  const updated = await Election.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteElection = async (req, res) => {
  await Election.findByIdAndDelete(req.params.id);
  res.json({ message: "Election deleted" });
};
