const fs = require("fs");
const bcrypt = require("bcrypt");

const getUsers = () => {
  const usersData = fs.readFileSync("users.json", "utf-8");
  return JSON.parse(usersData);
};

const registerUser = (req, username, password) => {
  const users = getUsers();
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    username: username,
    password: hashedPassword,
    todos: [],
  };
  users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

module.exports = {
  getUsers,
  registerUser,
};
