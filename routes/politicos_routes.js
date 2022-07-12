const express = require("express");
const router = express.Router();
const controller = require("../controllers/politicos_controller");

router.get("/", controller.politicos_get);
router.get("/nuevo", controller.nuevo_get);
router.post("/nuevo", controller.nuevo_post);
router.get("/:id", controller.details_get);

module.exports = router;
