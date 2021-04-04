const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const sgMail = require("@sendgrid/mail");

const email = (user) => {
  sgMail.setApiKey(
    "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"
  );

  const msg = {
    to: user.email, // Change to your recipient
    from: "ayman159@live.com", // Change to your verified sender
    subject: "Sign Up confirmation",
    text: "Registration confirmed",
    html: "<strong>Registration Confirmed</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
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

    email(newUser);

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
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    house: user.house,
    road: user.road,
    block: user.block,
    city: user.city,

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
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const user = req.user;
    await req.user.update(req.body);
    const payload = {
      id: user.id,
      username: user.username,
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
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
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
