const express = require("express");
const router = express.Router();

const controller = require("../controllers/historyController");
const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/documents/:id/history",
    verifyToken,
    controller.getHistory
);

module.exports = router;