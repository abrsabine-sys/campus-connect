// This array stores all events in memory (temporary storage, resets when server restarts)
let events = [];

module.exports = {

  // Creates a new event and adds it to the events array
  createEvent: (event) => {
    // Assign a unique ID based on current number of events
    event.id = events.length + 1;

    // Initialize an empty attendees list for RSVPs
    event.attendees = [];

    // Add the new event to the array
    events.push(event);

    // Log all events to the console for debugging
    console.log("EVENT CREATED:", events); 

    // Return the newly created event
    return event;
  },

  // Returns all events
  getAllEvents: () => {
    // Log events to check if they are being stored correctly
    console.log("GET EVENTS:", events); 

    return events;
  },

  // Adds a user to an event's attendee list (RSVP)
  rsvp: (eventId, username) => {

    // Find the event with the matching ID (convert eventId to number just in case)
    const event = events.find(e => e.id === parseInt(eventId));

    // If event doesn't exist, return null
    if (!event) return null;

    // Check if the user has not already RSVP'd
    if (!event.attendees.includes(username)) {
      // Add the user to the attendees list
      event.attendees.push(username);
    }

    // Return the updated event
    return event;
  }
};