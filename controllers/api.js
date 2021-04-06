//Make Zoom API call
var options = {
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

//ايميل احتياط
// exports.editEmail = (user, session) => {
//   sgMail.setApiKey(SENDGRID);
//   console.log("emails", user);
//   console.log("session", session);
//   const msg = {
//     to: ["ayman159@live.com", "fooded.bh@gmail.com"], //user.email,
//     from: "fooded.bh@gmail.com", // Change to our verified sender when created (info@fooded.com)
//     subject: "Session Updated",
//     text: `Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}`,
//     html: `<strong>Session zoom link: ${session.zoom}, Session time: ${session.time}, Session date: ${session.date}</strong>`,
//   };
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
