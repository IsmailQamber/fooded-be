const sgMail = require("@sendgrid/mail");
const { session } = require("passport");
const { SENDGRID, Email } = require("../config/keys");

exports.email = async (user, session) => {
  sgMail.setApiKey(SENDGRID);

  const msg = {
    to: Email, //user.email,
    from: Email, // Change to our verified sender when created (info@fooded.com)
    subject: "Booking Confirmation",
    text: `Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}`,
    html: `<strong>Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}</strong>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

exports.addEmail = async (user, session) => {
  sgMail.setApiKey(SENDGRID);

  const msg = {
    to: Email, //user.email,
    from: Email, // Change to our verified sender when created (info@fooded.com)
    subject: "New Session Added",
    text: `Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}`,
    html: `<strong>Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}</strong>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

exports.editEmail = async (user, session) => {
  sgMail.setApiKey(SENDGRID);

  const msg = {
    to: ["ayman159@live.com", Email], //user.email,
    from: Email, // Change to our verified sender when created (info@fooded.com)
    subject: "Session Updated",
    text: `Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}`,
    html: `<strong>Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}</strong>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

exports.signupEmail = async (user) => {
  sgMail.setApiKey(SENDGRID);

  const msg = {
    to: Email, //user.email,
    from: Email, // Change to our verified sender when created (info@fooded.com)
    subject: "Sign Up confirmation",
    text: "Registration confirmed",
    html: "<strong>Registration Confirmed</strong>",
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

exports.cancelEmail = async (user, session) => {
  sgMail.setApiKey(SENDGRID);

  const msg = {
    to: Email, //user
    from: Email, // Change to our verified sender when created (info@fooded.com)
    subject: "Session Cancelled",
    text: `Your session on: ${session.date}, at: ${session.time} has unfortunately been cancelled مسامحة`,
    html: `<strong>Your session on: ${session.date}, at: ${session.time} has unfortunately been cancelled مسامحة</strong>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};
