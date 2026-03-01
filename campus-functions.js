let users = [];
let events = [];

function registerUser(name, email, school) {
  if (!email.endsWith(".edu")) {
    throw new Error("Must use a school email");
  }

  const user = {
    id: users.length + 1,
    name,
    email,
    school
  };

  users.push(user);
  return user;
}
