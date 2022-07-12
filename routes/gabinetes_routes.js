const express = require("express");
const router = express.Router();
const controller = require("../controllers/gabinetes_controller");

/* GET home page. */
router.get("/", controller.gabinetes_get);
router.get("/nuevo", controller.nuevo_get);
router.post("/nuevo", controller.nuevo_post);

module.exports = router;
