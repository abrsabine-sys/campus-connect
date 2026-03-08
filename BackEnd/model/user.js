let users = [];

const create = ({ username, email }) => {
  const newUser = { id: users.length + 1, username, email, school: null };
  users.push(newUser);
  return newUser;
};

const joinSchool = (userId, school) => {
  const user = users.find(u => u.id === Number(userId));
  if (!user) return null;
  user.school = school;
  return user;
};

module.exports = { create, joinSchool };