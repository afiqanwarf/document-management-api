const express = require("express");
const router = express.Router();

const controller = require("../controllers/dashboardController");
const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/dashboard",
    verifyToken,
    controller.getDashboard
);

module.exports = router;