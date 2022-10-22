const express = require("express");
const app = express();

const userController = require("../controller/userController");

const router = express.Router();

router.route("/:login").get(userController.getUser);
router.route("/search/database").get(userController.searchFromDatabase);

router.route("/:id").patch(userController.updateUser);

module.exports = router;
