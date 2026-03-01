
let events = [];

module.exports = {
  createEvent: (event) => {
    event.id = events.length + 1;
    event.attendees = [];
    events.push(event);
    return event;
  },

  getAllEvents: () => events,

  rsvp: (eventId, username) => {
    const event = events.find(e => e.id === parseInt(eventId));
    if (!event) return null;
    if (!event.attendees.includes(username)) {
      event.attendees.push(username);
    }
    return event;
  }
};