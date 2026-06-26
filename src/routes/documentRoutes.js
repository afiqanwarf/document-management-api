const express = require("express");
const router = express.Router();
const controller = require("../controllers/documentController");
const verifyToken = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/documents",verifyToken,upload.single("file"),controller.createDocument);
router.get("/documents", verifyToken, controller.getDocuments);
router.put("/documents/:id", verifyToken, checkRole("admin"), controller.updateDocument);
router.delete("/documents/:id", verifyToken, checkRole("admin"), controller.deleteDocument);
router.get("/documents/search", verifyToken, controller.searchDocument);

module.exports = router;