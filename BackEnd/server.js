const express = require("express");
const path = require("path");
const cors = require("cors");

const eventRoutes = require("./routes/events");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRoutes);

app.use(express.static(path.join(__dirname, "..", "Public")));

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});