const API = "http://localhost:5000";

/* REGISTER USER */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const form = new FormData(registerForm);

    const data = {
      username: form.get("username"),
      email: form.get("email")
    };

    const res = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const user = await res.json();

    localStorage.setItem("userId", user.id);
    localStorage.setItem("username", user.username);

    window.location.href = "join-school.html";
  });
}


/* JOIN SCHOOL */

const joinSchoolForm = document.getElementById("joinSchoolForm");

if (joinSchoolForm) {
  joinSchoolForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const school = joinSchoolForm.school.value;

    await fetch(`${API}/users/join-school`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, school })
    });

    window.location.href = "view-events.html";

  });
}


/* LOAD EVENTS */

async function loadEvents() {

  const container = document.getElementById("eventList");

  if (!container) return;

  const res = await fetch(`${API}/events`);

  const events = await res.json();

  container.innerHTML = "";

  if (events.length === 0) {

    container.innerHTML = "<li>There are no current events.</li>";

    return;
  }

  events.forEach(event => {

    const li = document.createElement("li");

    li.innerHTML = `
      <strong onclick="goToRSVP(${event.id})" style="cursor:pointer">${event.title}</strong>
      <br>
      Date: ${event.date}
      <br>
      Organizer: ${event.creator}
      <br>
      Attendees: ${event.attendees.length}
      <br>
      <button onclick="rsvp(${event.id})">RSVP</button>
      <hr>
    `;

    container.appendChild(li);

  });

}


/* GO TO RSVP PAGE */

function goToRSVP(eventId) {

  window.location.href = `rsvp.html?id=${eventId}`;

}


/* RSVP */

async function rsvp(eventId) {

  const username = localStorage.getItem("username");

  if (!username) {

    alert("Please register first");

    return;

  }

  await fetch(`${API}/events/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ eventId, username })
  });

  loadEvents();

}


/* CREATE EVENT */

async function createEvent() {

  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const creator =
    document.getElementById("creator").value ||
    localStorage.getItem("username");

  if (!title || !date || !creator) {

    alert("Please fill out all fields");

    return;

  }

  await fetch(`${API}/events/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, date, creator })
  });

  /* clear inputs */

  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("creator").value = "";

  /* reload events so it appears immediately */

  loadEvents();

}


/* PAGE LOAD */

window.addEventListener("load", loadEvents);