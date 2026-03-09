const { createEvent, getAllEvents, rsvp, cancelRSVP, deleteEvent } = require("../BackEnd/model/event");

describe("Event Model Tests", () => {

  beforeEach(() => {
    // Reset events array before each test
    while (getAllEvents().length > 0) {
      deleteEvent(getAllEvents()[0].id);
    }
  });

  test("Create a new event", () => {
    const event = createEvent({
      title: "Hackathon",
      date: "2026-05-01",
      creator: "Abram"
    });

    expect(event.id).toBe(1);
    expect(event.title).toBe("Hackathon");
    expect(event.attendees.length).toBe(0);
  });

  test("Get all events", () => {
    createEvent({ title: "Event1", date: "2026-05-01", creator: "Abram" });
    createEvent({ title: "Event2", date: "2026-06-01", creator: "You" });

    const events = getAllEvents();
    expect(events.length).toBe(2);
    expect(events[0].title).toBe("Event1");
    expect(events[1].title).toBe("Event2");
  });

  test("RSVP to an event", () => {
    const event = createEvent({ title: "Hackathon", date: "2026-05-01", creator: "Abram" });

    rsvp(event.id, "Alice");
    expect(event.attendees).toContain("Alice");
  });

  test("Cancel RSVP", () => {
    const event = createEvent({ title: "Hackathon", date: "2026-05-01", creator: "Abram" });

    rsvp(event.id, "Alice");
    cancelRSVP(event.id, "Alice");
    expect(event.attendees).not.toContain("Alice");
  });

  test("Delete an event", () => {
    const event = createEvent({ title: "Hackathon", date: "2026-05-01", creator: "Abram" });

    deleteEvent(event.id);
    expect(getAllEvents().length).toBe(0);
  });

});