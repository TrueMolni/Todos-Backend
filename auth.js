// auth.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { getUsers } = require("./users");

const generateToken = (username) => {
  return jwt.sign({ username }, "secret_key", { expiresIn: "2h" });
};

const authenticateUser = (username, password) => {
  const users = getUsers();
  const user = users.find((user) => user.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    return generateToken(username);
  }
  return null;
};

module.exports = {
  generateToken,
  authenticateUser,
};
