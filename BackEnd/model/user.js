// In-memory storage (resets when server restarts)
let events = [];

// Helper to reset events (useful for testing)
const resetEvents = () => {
  events = [];
};

// Create a new event
const createEvent = (event) => {
  if (!event || !event.name) {
    throw new Error("Event must have a name");
  }

  const newEvent = {
    id: events.length + 1,
    name: event.name,
    date: event.date || null,
    attendees: []
  };

  events.push(newEvent);

  console.log("EVENT CREATED:", events);

  return newEvent;
};

// Get all events
const getAllEvents = () => {
  console.log("GET EVENTS:", events);
  return events;
};

// RSVP to an event
const rsvp = (eventId, username) => {
  if (!username) {
    throw new Error("Username is required");
  }

  const event = events.find(e => e.id === parseInt(eventId));

  if (!event) return null;

  if (!event.attendees.includes(username)) {
    event.attendees.push(username);
  }

  return event;
};

// Export everything
module.exports = {
  createEvent,
  getAllEvents,
  rsvp,
  resetEvents // useful for unit tests
};