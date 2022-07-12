const express = require("express");
const router = express.Router();
const controller = require("../controllers/index_controller");

/* GET home page. */
router.get("/", controller.getIndex);

module.exports = router;
