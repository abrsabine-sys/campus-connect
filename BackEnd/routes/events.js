const express = require("express");
const router = express.Router();

const { createEvent, getAllEvents, rsvp, cancelRSVP, deleteEvent } = require("../model/event");

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

// CANCEL RSVP
router.post("/cancel-rsvp", (req, res) => {

  const { eventId, username } = req.body;

  const event = cancelRSVP(eventId, username);

  if (!event) return res.status(404).json({ error: "Event not found" });

  res.json(event);

});

// DELETE EVENT
router.post("/delete", (req, res) => {

  const { eventId } = req.body;

  deleteEvent(eventId);

  res.json({ success: true });

});

module.exports = router;