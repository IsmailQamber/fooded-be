const { Session, Booking } = require("../db/models");
const { Op } = require("sequelize");
const moment = require("moment");

const sgMail = require("@sendgrid/mail");
const { SENDGRID } = require("../config/keys");

const zoomSessionCreate = () => {
  const options = {
    uri: "https://api.zoom.us/v2/users",
    qs: {
      status: "active", // -> uri + '?status=active'
    },
    auth: {
      //Provide your token here
      bearer:
        eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
          .eyJhdWQiOm51bGwsImlzcyI6IjhIS0NUcTZGUzFtbFR4WXBqa3JIWkEiLCJleHAiOjE2MTc1OTI3OTUsImlhdCI6MTYxNzU4NzM5NX0
          .k8VgwiA_1at2SpPgBwNlCi5sdpQXvvB1ZK1AAoatETQ,
    },
    headers: {
      "User-Agent": "Zoom-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      //logic for your response
      console.log("User has", response);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
};

const email = (user) => {
  sgMail.setApiKey(SENDGRID);

  const msg = {
    to: user.email, //user.email, // Change to your recipient
    from: "ayman159@live.com", // Change to your verified sender
    subject: "Sign Up confirmation",
    text: "Bookeing",
    html: "<strong>Booking</strong>",
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

exports.fetchSessions = async (sessionId, next) => {
  try {
    return (found = await Session.findByPk(sessionId));
  } catch (error) {
    next(error);
  }
};

exports.listSessions = async (req, res, next) => {
  try {
    // Adding 24 hours to the current time
    const add_minutes = (dt, minutes) => {
      return new Date(dt.getTime() + minutes * 60000);
    };
    const timeNow = add_minutes(new Date(), 1440).toLocaleTimeString("en-GB");

    //Tommorow date
    const tommorow = moment().add(1, "days");

    const sessions = await Session.findAll({
      where: {
        // This was so confusing, don't try this at home
        [Op.or]: [
          {
            [Op.and]: [
              {
                time: {
                  [Op.gt]: timeNow,
                },
                date: {
                  [Op.eq]: tommorow,
                },
              },
            ],
          },
          {
            date: {
              [Op.gt]: tommorow,
            },
          },
        ],
      },
    });
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

exports.addBooking = async (req, res, next) => {
  try {
    req.body.sessionId = req.session.id;
    req.body.userId = req.user.id;
    const newBooking = await Booking.create(req.body);
    email(req.user);
    res.status(201);
    res.json(newBooking);
  } catch (error) {
    next(error);
  }
};
