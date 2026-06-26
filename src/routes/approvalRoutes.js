const express = require("express");
const router = express.Router();

const controller = require("../controllers/approvalController");
const verifyToken = require("../middleware/authMiddleware");

router.post(
    "/documents/:id/approve",
    verifyToken,
    controller.approveDocument
);

module.exports = router;