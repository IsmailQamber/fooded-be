const sgMail = require("@sendgrid/mail");
const { SENDGRID } = require("../config/keys");

exports.email = async (user, session) => {
  sgMail.setApiKey(SENDGRID);

  const msg = {
    to: "fooded.bh@gmail.com", //user.email,
    from: "fooded.bh@gmail.com", // Change to our verified sender when created (info@fooded.com)
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
    to: "fooded.bh@gmail.com", //user.email,
    from: "fooded.bh@gmail.com", // Change to our verified sender when created (info@fooded.com)
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
    to: ["ayman159@live.com", "fooded.bh@gmail.com"], //user.email,
    from: "fooded.bh@gmail.com", // Change to our verified sender when created (info@fooded.com)
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
    to: "fooded.bh@gmail.com", //user.email,
    from: "fooded.bh@gmail.com", // Change to our verified sender when created (info@fooded.com)
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
