const { createEvent, getAllEvents, rsvp, cancelRSVP, deleteEvent } = require("../BackEnd/model/event");

describe("Event Model Tests", () => {
  test("should create a new event", () => {
    const event = createEvent({
      title: "Hackathon",
      date: "2026-03-09",
      creator: "Admin"
    });
    expect(event).toHaveProperty("id");
    expect(event.title).toBe("Hackathon");
    expect(event.date).toBe("2026-03-09");
    expect(event.creator).toBe("Admin");
    expect(event.attendees).toEqual([]);
  });

  test("should return all events", () => {
    const events = getAllEvents();
    expect(events.length).toBeGreaterThan(0);
  });

  test("should RSVP a user to an event", () => {
    const event = rsvp(1, "TestUser");
    expect(event.attendees).toContain("TestUser");
  });

  test("should cancel RSVP for a user", () => {
    const event = cancelRSVP(1, "TestUser");
    expect(event.attendees).not.toContain("TestUser");
  });

  test("should delete an event", () => {
    const result = deleteEvent(1);
    expect(result).toBe(true);
    const events = getAllEvents();
    expect(events.find(e => e.id === 1)).toBeUndefined();
  });
});