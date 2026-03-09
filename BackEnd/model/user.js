// BackEnd/model/user.js
let users = [];

const create = ({ username, email, password }) => {
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    school: null
  };
  users.push(newUser);
  return newUser;
};

// Define login function properly
const login = ({ email, password }) => {
  return users.find(u => u.email === email && u.password === password);
};

const joinSchool = (userId, school) => {
  const user = users.find(u => u.id === Number(userId));
  if (!user) return null;
  user.school = school;
  return user;
};

module.exports = { create, login, joinSchool };