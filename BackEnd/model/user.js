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


const joinSchool = (userId, school) => {

  const user = users.find(u => u.id === Number(userId));

  if (!user) return null;

  user.school = school;

  return user;

};

module.exports = { create, login, joinSchool };