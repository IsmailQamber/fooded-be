const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const userRoutes = require("./routes/user");
const recipeRoutes = require("./routes/recipe");
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

//Routes
app.use(userRoutes);
app.use("/recipes", recipeRoutes);
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
