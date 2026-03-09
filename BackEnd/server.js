const express = require("express");
const cors = require("cors");

const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRoutes);
app.use("/users", userRoutes);  

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});