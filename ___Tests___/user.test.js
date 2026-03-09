const { create, login, joinSchool } = require("../BackEnd/model/user");

describe("User Model Tests", () => {
  test("should create a new user", () => {
    const user = create({
      username: "TestUser",
      email: "test@test.com",
      password: "1234"
    });
    expect(user).toHaveProperty("id");
    expect(user.username).toBe("TestUser");
    expect(user.email).toBe("test@test.com");
    expect(user.password).toBe("1234");
    expect(user.school).toBeNull();
  });

  test("should login with correct credentials", () => {
    const user = login({ email: "test@test.com", password: "1234" });
    expect(user).toBeDefined();
    expect(user.username).toBe("TestUser");
  });

  test("should fail login with incorrect credentials", () => {
    const user = login({ email: "wrong@test.com", password: "0000" });
    expect(user).toBeUndefined();
  });

  test("should allow user to join a school", () => {
    const user = joinSchool(1, "Highline University");
    expect(user.school).toBe("Highline University");
  });

  test("should return null if user not found when joining a school", () => {
    const user = joinSchool(999, "No School");
    expect(user).toBeNull();
  });
});