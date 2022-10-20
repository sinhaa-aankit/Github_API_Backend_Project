const express = require("express");
const app = express();

const userController = require("../controller/userController");

const router = express.Router();

router.route("/:username").get(userController.getUser);

module.exports = router;
