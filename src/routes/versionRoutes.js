const express = require("express");
const router = express.Router();

const controller = require("../controllers/versionController");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post(
    "/documents/:id/version",
    verifyToken,
    upload.single("file"),
    controller.createVersion
);

router.get(
    "/documents/:id/versions",
    verifyToken,
    controller.getVersions
);

module.exports = router;