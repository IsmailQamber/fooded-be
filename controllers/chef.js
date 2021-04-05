const { Chef, Recipe, Session } = require("../db/models");

const zoomSessionCreate = () => {
  const options = {
    uri: "https://api.zoom.us/v2/users/ism-you-95@hotmail.com/meetings", // change the email if you are using ur auth
    qs: {
      status: "active", // -> uri + '?status=active'
    },
    auth: {
      //Provide your token here
      bearer:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjhIS0NUcTZGUzFtbFR4WXBqa3JIWkEiLCJleHAiOjE2MTc1OTI3OTUsImlhdCI6MTYxNzU4NzM5NX0.k8VgwiA_1at2SpPgBwNlCi5sdpQXvvB1ZK1AAoatETQ",
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

exports.fetchChefs = async (chefId, next) => {
  try {
    return (found = await Chef.findByPk(chefId));
  } catch (error) {
    next(error);
  }
};

exports.listChefs = async (req, res, next) => {
  try {
    const chefs = await Chef.findAll();
    res.status(200);
    res.json(chefs);
  } catch (error) {
    next(error);
  }
};

exports.addChef = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newChef = await Chef.create(req.body);
    res.status(201);
    res.json(newChef);
  } catch (error) {
    next(error);
  }
};

exports.detailChef = async (req, res, next) => {
  try {
    const detailChef = await req.chef;
    res.status(200).json(detailChef);
  } catch (error) {
    next(error);
  }
};

exports.addRecipe = async (req, res, next) => {
  try {
    if (req.user.id === req.chef.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.chefId = req.chef.id;
      const newRecipe = await Recipe.create(req.body);
      res.status(201);
      res.json(newRecipe);
    } else {
      const error = new Error("not your recipe");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    if (req.user.id === req.chef.userId && req.recipe.chefId === req.chef.id) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      const updatedRecipe = await req.recipe.update(req.body);
      res.status(200).json(updatedRecipe);
    } else {
      const error = new Error("not your recipe");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.removeRecipe = async (req, res, next) => {
  try {
    if (req.user.id === req.chef.userId && req.recipe.chefId === req.chef.id) {
      await req.recipe.destroy();
      res.status(204);
      res.end();
    } else {
      const error = new Error("not your recipe");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.addSession = async (req, res, next) => {
  try {
    if (req.user.id === req.chef.userId) {
      //req.recipe.chefId === req.chef.id && condition
      // zoomSessionCreate();
      const newSession = await Session.create(req.body);
      res.status(201);
      res.json(newSession);
    } else {
      const error = new Error("not your session");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
