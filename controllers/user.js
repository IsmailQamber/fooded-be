const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const { signupEmail } = require("./email");

const userPayload = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    userType: user.userType,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    house: user.house,
    road: user.road,
    block: user.block,
    city: user.city,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  return payload;
};

exports.signup = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);

    signupEmail(newUser);

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

  const token = jwt.sign(JSON.stringify(userPayload(user)), JWT_SECRET);
  res.status(201).json({ token });
};

exports.userFetch = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
};

exports.userUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const user = req.user;
    await req.user.update(req.body);
    userPayload(user);
    const token = jwt.sign(JSON.stringify(user), JWT_SECRET);
    res.status(200).json([req.user, token]);
  } catch (err) {
    next(err);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200);
    res.json(users);
  } catch (error) {
    next(error);
  }
};
