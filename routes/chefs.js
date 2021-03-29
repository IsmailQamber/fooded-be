const express = require("express");
const router = express.Router();

const { chefsList } = require("../controllers/chefs");

router.get("/", chefsList);

module.exports = router;
