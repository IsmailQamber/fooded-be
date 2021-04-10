const { Chef, Recipe, Session, Booking, User } = require("../db/models");
const axios = require("axios");
const { Op } = require("sequelize");
const { addEmail, editEmail, cancelEmail } = require("./email");
const { zoom_key, zoom_url } = require("../config/keys");
const IngredientRecipe = require("../db/models/IngredientRecipe");
const ingredient = require("../db/models/ingredient");

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
      if (req.body.ingredientDescription) {
        console.log(req.body.ingredientDescription);
        const newRecipe = await Recipe.create(req.body);
        req.body.ingredientDescription.map(async (ingredient) => {
          console.log(ingredient);
          const data = {
            RecipeId: req.body.id,
            IngredientId: ingredient,
          };
          await IngredientRecipe.create(data);
        });
        res.status(201);
        res.json(newRecipe);
      }
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
      const body = {
        topic: "cooking",
        type: 1,
        start_time: `${req.body.date}-${req.body.time}`,
        duration: 45,
        schedule_for: "fooded.bh@gmail.com", //chenge to info@fooded.com
        timezone: "Asia/Bahrain",
        password: "123456",
        settings: {
          host_video: true,
          participant_video: true,
          cn_meeting: false,
          in_meeting: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 2,
          audio: "both",
          auto_recording: "cloud",
          registrants_email_notification: true,
        },
      };

      const headers = {
        authorization: zoom_key,
      };

      const response = await axios.post(zoom_url, body, {
        headers: headers,
      });

      req.body.zoom = response.data.join_url;

      const newSession = await Session.create(req.body);
      addEmail(req.user, newSession);
      console.log(req.body);
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

exports.updateSession = async (req, res, next) => {
  console.log(req.body);
  try {
    if (
      req.user.id === req.chef.userId &&
      req.session.recipeId === req.recipe.id &&
      req.recipe.chefId === req.chef.id
    ) {
      //finding users that booked this session
      const bookings = await Booking.findAll({
        where: { sessionId: { [Op.eq]: req.session.id } },
      });

      let sessionUsers = bookings.map((booking) => booking.dataValues.userId);

      const allUsers = await User.findAll({});

      const usersData = allUsers.filter((usrs) =>
        sessionUsers.find((usr) => usrs.id === usr)
      );

      const userEmails = usersData.map((U) => U.dataValues.email);

      //zoom link generator
      const body = {
        topic: "cooking",
        type: 1,
        start_time: `${req.body.date}-${req.body.time}`,
        duration: 45,
        schedule_for: "fooded.bh@gmail.com", //chenge to info@fooded.com
        timezone: "Asia/Bahrain",
        password: "123456",
        settings: {
          host_video: true,
          participant_video: true,
          cn_meeting: false,
          in_meeting: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 2,
          audio: "both",
          auto_recording: "cloud",
          registrants_email_notification: true,
        },
      };

      const headers = {
        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkxfRGdDODI5VGgybEtpQkNSeXhwYUEiLCJleHAiOjE2NDkzMjkyMDAsImlhdCI6MTYxNzgwMDYwNn0.v4ezC1BepQvlhMHRLIo7KWQ8-F4Y_IGh9pbi1Mq3ywU",
      };

      const response = await axios.post(
        "https://api.zoom.us/v2/users/fooded.bh@gmail.com/meetings",
        body,
        {
          headers: headers,
        }
      );

      req.body.zoom = response.data.join_url;

      const updatedSession = await req.session.update(req.body);
      editEmail(userEmails, req.session);
      res.status(200).json(updatedSession);
    } else {
      const error = new Error("not your session");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.removeSession = async (req, res, next) => {
  try {
    if (
      req.user.id === req.chef.userId &&
      req.session.recipeId === req.recipe.id &&
      req.recipe.chefId === req.chef.id
    ) {
      //finding users that booked this session
      const bookings = await Booking.findAll({
        where: { sessionId: { [Op.eq]: req.session.id } },
      });
      const sessionBookings = bookings.map((booking) => booking.id);

      let sessionUsers = bookings.map((booking) => booking.dataValues.userId);

      const allUsers = await User.findAll({});

      const usersData = allUsers.filter((usrs) =>
        sessionUsers.find((usr) => usrs.id === usr)
      );

      const userEmails = usersData.map((U) => U.dataValues.email);
      cancelEmail(userEmails, req.session);
      await req.session.destroy();
      await Booking.destroy({ where: { id: sessionBookings } });
      res.status(204);
      res.end();
    } else {
      const error = new Error("not your session");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
