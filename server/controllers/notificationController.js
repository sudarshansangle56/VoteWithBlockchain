import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
};

export const createNotification = async (req, res) => {
  const newNotification = new Notification(req.body);
  await newNotification.save();
  res.status(201).json(newNotification);
};

export const updateNotification = async (req, res) => {
  const updated = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ message: "Notification deleted" });
};
