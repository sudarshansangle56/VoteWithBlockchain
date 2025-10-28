import Party from "../models/Party.js";

export const getParties = async (req, res) => {
  const parties = await Party.find();
  res.json(parties);
};

export const createParty = async (req, res) => {
  const newParty = new Party(req.body);
  await newParty.save();
  res.status(201).json(newParty);
};

export const updateParty = async (req, res) => {
  const updated = await Party.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteParty = async (req, res) => {
  await Party.findByIdAndDelete(req.params.id);
  res.json({ message: "Party deleted" });
};
