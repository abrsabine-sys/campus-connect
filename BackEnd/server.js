const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/users.js');
const eventRoutes = require('./routes/events.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

// API routes
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});