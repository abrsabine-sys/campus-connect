const API_URL = 'http://localhost:5000';

// Registration
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(registerForm));
    const res = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const user = await res.json();
    localStorage.setItem('userId', user.id);
    window.location.href = 'join-school.html';
  });
}

// Join School
const joinSchoolForm = document.getElementById('joinSchoolForm');
if (joinSchoolForm) {
  joinSchoolForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const data = { userId, school: joinSchoolForm.school.value };
    await fetch(`${API_URL}/users/join-school`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    window.location.href = 'view-events.html';
  });
}

// View Events
const eventList = document.getElementById('eventList');
if (eventList) {
  fetch(`${API_URL}/events`)
    .then(res => res.json())
    .then(events => {
      events.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = `ID: ${e.id} | ${e.title} | ${e.date} | Attendees: ${e.attendees.length} <button onclick="rsvp(${e.id})">RSVP</button>`;
        eventList.appendChild(li);
      });
    });
}

// RSVP function
async function rsvp(eventId) {
  const userId = localStorage.getItem('userId');
  const username = 'testuser'; // replace with dynamic username if stored
  await fetch(`${API_URL}/events/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId, username })
  });
  alert('RSVP Successful!');
  window.location.reload();
}

// Create Event
const createEventForm = document.getElementById('createEventForm');
if (createEventForm) {
  createEventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(createEventForm));
    const res = await fetch(`${API_URL}/events/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, creator: 'testuser' })
    });
    alert('Event Created!');
    window.location.href = 'view-events.html';
  });
}

async function loadEvents() {
  const res = await fetch('http://localhost:5000/events');
  const events = await res.json();

  const container = document.getElementById('eventsContainer');
  container.innerHTML = '';

  events.forEach(event => {
    const div = document.createElement('div');

    div.innerHTML = `
      <h3>${event.title}</h3>
      <p>Date: ${event.date}</p>
      <p>Attendees: ${event.attendees.length}</p>
      <button onclick="rsvp(${event.id})">RSVP</button>
    `;

    container.appendChild(div);
  });
}

// Load events when page opens
window.onload = loadEvents;