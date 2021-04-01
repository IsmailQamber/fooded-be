const { Session } = require("../db/models");
const { Op } = require("sequelize");

exports.fetchSessions = async (sessionId, next) => {
  try {
    return (found = await Session.findByPk(sessionId));
  } catch (error) {
    next(error);
  }
};

exports.listSessions = async (req, res, next) => {
  try {
    const sessions = await Session.findAll();
    res.status(200);
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};

// exports.addSession = async (req, res, next) => {
//   try {
//     const newSession = await Session.create(req.body);
//     res.status(201);
//     res.json(newSession);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.updateSession = async (req, res, next) => {
//   try {
//     const updatedSession = await req.session.update(req.body);
//     res.status(204);
//     res.json(updatedSession);
//   } catch (error) {
//     next(error);
//   }
// };

exports.removeSession = async (req, res, next) => {
  try {
    await req.session.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.searchSession = async (req, res, next) => {
  try {
    console.log(req.body.date);
    const chefs = await Session.findAll({
      where: { date: { [Op.eq]: `%${req.body.date}%` } },
    });
    res.status(200);
    res.json(chefs);
  } catch (error) {
    next(error);
  }
};
