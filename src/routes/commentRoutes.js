const express = require("express");
const router = express.Router();

const controller = require("../controllers/commentController");
const verifyToken = require("../middleware/authMiddleware");

router.post(
    "/documents/:id/comments",
    verifyToken,
    controller.addComment
);

router.get(
    "/documents/:id/comments",
    verifyToken,
    controller.getComments
);

module.exports = router;