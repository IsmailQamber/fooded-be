const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const userRoutes = require("./routes/user");
const recipeRoutes = require("./routes/recipe");
const sessionRoutes = require("./routes/session");
const chefRoutes = require("./routes/chef");
const bookingRoutes = require("./routes/booking");

const ingredientsRoutes = require("./routes/ingredient");
const IngredientReicpeRoutes = require("./routes/ingredientRecipe");

const cuisineRoutes = require("./routes/cuisine");

const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const path = require("path");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(userRoutes);
app.use("/chefs", chefRoutes);
app.use("/recipes", recipeRoutes);
app.use("/sessions", sessionRoutes);
app.use("/booking", bookingRoutes);
app.use("/relation", IngredientReicpeRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/cuisine", cuisineRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

//Handle 404
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

//Server Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

//Sync DB and listen to port
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
  });
};

run();
