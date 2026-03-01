// BackEnd/routes/events.js
const express = require('express');
const router = express.Router();

// Correct relative path to model
const { createEvent, getAllEvents, rsvp } = require('../model/event.js');

// Create a new event
router.post('/create', (req, res) => {
  const { title, date, creator } = req.body;
  if (!title || !date || !creator) {
    return res.status(400).send('Missing fields');
  }
  const event = createEvent({ title, date, creator });
  res.status(201).json(event);
});

// Get all events
router.get('/', (req, res) => {
  res.json(getAllEvents());
});

// RSVP to an event
router.post('/rsvp', (req, res) => {
  const { eventId, username } = req.body;
  const updatedEvent = rsvp(eventId, username);
  if (!updatedEvent) return res.status(404).send('Event not found');
  res.json(updatedEvent);
});

module.exports = router;