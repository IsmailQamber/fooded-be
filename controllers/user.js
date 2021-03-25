const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      userType: newUser.userType,
      email: newUser.email,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    userType: user.userType,
    email: user.email,

    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.status(201).json({ token });
};

exports.userFetch = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
};

// *B
exports.userUpdate = async (req, res, next) => {
  try {
    const user = req.user;
    await req.user.update(req.body);
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(200).json([req.user, token]);
  } catch (err) {
    next(err);
  }
};
