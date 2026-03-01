const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let events = [];
let userId = 1;
let eventId = 1;

app.post("/register", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const user = { id: userId++, name, email, school: null };
  users.push(user);

  res.json(user);
});

app.post("/join-school", (req, res) => {
  const { userId, school } = req.body;

  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.school = school;
  res.json(user);
});

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/rsvp", (req, res) => {
  const { eventId, userEmail } = req.body;
  const event = events.find(e => e.id === eventId);
  const user = users.find(u => u.email === userEmail);
  if (!event || !user) return res.status(404).json({ error: "Event or user not found" });

  if (!event.attendees.includes(userEmail)) event.attendees.push(userEmail);
  res.json({ message: "RSVP successful" });
});

app.post("/create-event", (req, res) => {
  const { title, date, creatorEmail } = req.body;
  const creator = users.find(u => u.email === creatorEmail);
  if (!creator) return res.status(404).json({ error: "Creator not found" });

  const newEvent = {
    id: events.length + 1,
    title,
    date,
    creator: creator.username,
    attendees: []
  };
  events.push(newEvent);
  res.json({ message: "Event created", event: newEvent });
});
