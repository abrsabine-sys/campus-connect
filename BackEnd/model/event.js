let events = [];

function createEvent({ title, date, creator }) {
  const newEvent = {
    id: events.length + 1,
    title,
    date,
    creator,
    attendees: []
  };

  events.push(newEvent);
  return newEvent;
}

function getAllEvents() {
  return events;
}

function rsvp(eventId, username) {
  const event = events.find(e => e.id == eventId);
  if (!event) return null;

  if (!event.attendees.includes(username)) {
    event.attendees.push(username);
  }

  return event;
}

module.exports = { createEvent, getAllEvents, rsvp };