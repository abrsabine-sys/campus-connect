const request = require("supertest");
const app = require("../server");

describe("Users API", () => {

  test("POST /users/register", async () => {

    const res = await request(app)
      .post("/users/register")
      .send({
        username: "Test",
        email: "test@test.com",
        password: "1234"
      });

    expect(res.statusCode).toBe(200);
  });

  test("POST /users/login", async () => {

    const res = await request(app)
      .post("/users/login")
      .send({
        email: "test@test.com",
        password: "1234"
      });

    expect(res.statusCode).toBe(200);
  });

});