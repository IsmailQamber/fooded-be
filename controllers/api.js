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
