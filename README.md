Testing Approach

This project uses Jest as the testing framework to verify the core functionality of the backend. The focus of testing is on the business logic inside the model files rather than the Express routes.

Unit tests were written to validate the behavior of key functions in the application, especially in the event model. Each function is tested independently to ensure it performs correctly under normal and edge-case conditions.

The tests include:

Success cases

Creating a new event successfully

Retrieving all events

RSVPing to an event

Failure cases

Attempting to RSVP to a non-existent event

Preventing duplicate attendees from being added

Test Coverage

The following core functions are covered by unit tests:

createEvent()

Verifies that events are created with a unique ID

Ensures attendees array is initialized

getAllEvents()

Confirms all created events are returned correctly

rsvp()

Checks that a user is added to an event’s attendee list

Ensures duplicate RSVPs are not added

Returns null if the event does not exist
