const API = "http://localhost:5000";

/* REGISTER */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", async (e) => {

    e.preventDefault(); // THIS STOPS PAGE RESET

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });

    if (!res.ok) {
      alert("Registration failed");
      return;
    }

    const user = await res.json();

    localStorage.setItem("userId", user.id);
    localStorage.setItem("username", user.username);

    window.location.href = "join-school.html";

  });

}


async function register(event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const res = await fetch(API + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (data.message) {
        alert("Registered! Please login.");
        window.location.href = "login.html";
    }
}
const joinSchoolForm = document.getElementById("joinSchoolForm");

if (joinSchoolForm) {

  joinSchoolForm.addEventListener("submit", async (e) => {

    e.preventDefault(); // prevents page reset

    const userId = localStorage.getItem("userId");
    const school = document.getElementById("school").value;

    await fetch("http://localhost:5000/users/join-school", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, school })
    });

    window.location.href = "view-events.html";

  });

}
/* ---------------- EVENTS ---------------- */

async function loadEvents() {

  const container = document.getElementById("events");
  if (!container) return;

  const res = await fetch("http://localhost:5000/events");
  const events = await res.json();

  const currentUser = localStorage.getItem("username");

  container.innerHTML = "";

  if (events.length === 0) {
    container.innerHTML = "<p>No events available.</p>";
    return;
  }

  events.forEach(event => {

    const div = document.createElement("div");

    // make sure attendees exists
    if (!event.attendees) {
      event.attendees = [];
    }

    let cancelButton = "";
    let deleteButton = "";

    // show cancel RSVP if user is attending
    if (event.attendees.includes(currentUser)) {
      cancelButton = `<button onclick="cancelRSVP(${event.id})">Cancel RSVP</button>`;
    }

    // show delete if user created event
    if (event.creator === currentUser) {
      deleteButton = `<button onclick="deleteEvent(${event.id})">Delete Event</button>`;
    }

    div.innerHTML = `
      <strong>${event.title}</strong><br>
      Date: ${event.date}<br>
      Organizer: ${event.creator}<br>
      Attendees: ${event.attendees.length}
      <br><br>

      <button onclick="goToRSVP(${event.id})">RSVP</button>

      ${cancelButton}

      ${deleteButton}

      <hr>
    `;

    container.appendChild(div);

  });

}

window.onload = loadEvents;

/* ---------------- RSVP ---------------- */

async function rsvp(eventId) {

  const username = localStorage.getItem("username");

  if (!username) {
    alert("Please login first");
    return;
  }

  await fetch("http://localhost:5000/events/rsvp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventId,
      username
    })
  });

  loadEvents();

}

async function cancelRSVP(eventId) {

  const username = localStorage.getItem("username");

  await fetch("http://localhost:5000/events/cancel-rsvp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventId,
      username
    })
  });

  loadEvents();
}

/* ---------------- DELETE EVENT ---------------- */

async function deleteEvent(eventId) {

  const confirmDelete = confirm("Delete this event?");

  if (!confirmDelete) return;

  await fetch("http://localhost:5000/events/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      eventId
    })
  });

  loadEvents();
}

function goToRSVP(eventId) {

  window.location.href = `rsvp.html?id=${eventId}`;

}

/* ---------------- INIT ---------------- */

document.addEventListener("DOMContentLoaded", () => {
    loadEvents();
});

function logout() {

  localStorage.clear();

  window.location.href = "index.html";

}