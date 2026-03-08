const express = require("express");
const router = express.Router();

const { createEvent, getAllEvents, rsvp } = require("../model/event");

// CREATE EVENT
router.post("/create", (req, res) => {
  const { title, date, creator } = req.body;

  const event = createEvent({ title, date, creator });

  res.json(event);
});

// GET ALL EVENTS
router.get("/", (req, res) => {
  res.json(getAllEvents());
});

// RSVP
router.post("/rsvp", (req, res) => {
  const { eventId, username } = req.body;

  const updated = rsvp(eventId, username);

  if (!updated) {
    return res.status(404).json({ error: "Event not found" });
  }

  res.json(updated);
});

module.exports = router;