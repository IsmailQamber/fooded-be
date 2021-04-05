const { Chef, Recipe, Session } = require("../db/models");
const request = require("request");

const zoomSessionCreate = (body) => {
  var options = {
    method: "POST",
    // Use the `me` keyword for the request below.
    url: "https://api.zoom.us/v2/users/ism-you-95@hotmail.com/meetings",
    headers: {
      authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjhIS0NUcTZGUzFtbFR4WXBqa3JIWkEiLCJleHAiOjE2MTgyMzM1NjMsImlhdCI6MTYxNzYyODc2M30.I6_-XAaOXtB9jr7swRniOaPQx75g5vb0n1m7G_xzZ_8", // Do not publish or share your token with anyone.
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    console.log("respoooonseee", response.body);
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
      const newSession = await Session.create(req.body);
      res.status(201);
      res.json(newSession);
      const reqbody = {
        topic: "cooking",
        type: 1,
        start_time: newSession.time,
        duration: 45,
        schedule_for: "ism-you-95@hotmail.com",
        timezone: "Asia/Bahrain",
        password: "123456",
        settings: {
          host_video: true,
          participant_video: true,
          cn_meeting: false,
          in_meeting: true,
          join_before_host: true,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 2,
          audio: "both",
          auto_recording: "cloud",
          registrants_email_notification: true,
        },
      };
      zoomSessionCreate(reqbody);
      console.log(reqbody);
    } else {
      const error = new Error("not your session");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
