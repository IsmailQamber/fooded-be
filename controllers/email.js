const sgMail = require("@sendgrid/mail");
const { SENDGRID } = require("../config/keys");

exports.email = (user, session) => {
  sgMail.setApiKey(SENDGRID);

  const msg = {
    to: "fooded.bh@gmail.com", //user.email,
    from: "fooded.bh@gmail.com", // Change to our verified sender when created (info@fooded.com)
    subject: "Bookimg Confirmation",
    text: `Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}`,
    html: `<strong>Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}</strong>`,
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

exports.addEmail = (user, session) => {
  sgMail.setApiKey(SENDGRID);

  const msg = {
    to: "fooded.bh@gmail.com", //user.email,
    from: "fooded.bh@gmail.com", // Change to our verified sender when created (info@fooded.com)
    subject: "New Session Added",
    text: `Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}`,
    html: `<strong>Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}</strong>`,
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
