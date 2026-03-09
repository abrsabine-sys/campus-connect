const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('../BackEnd/routes/events');

const app = express();
app.use(bodyParser.json());
app.use('/events', eventRoutes);

describe('Events API', () => {
  it('should create a new event', async () => {
    const res = await request(app)
      .post('/events/create')
      .send({ title: 'Test Event', date: '2026-03-05', creator: 'Alice' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test Event');
  });

  it('should get all events', async () => {
    const res = await request(app).get('/events');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});