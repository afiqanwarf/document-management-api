const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController");
const verifyToken = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

router.post("/categories", verifyToken, checkRole("admin"), controller.createCategory);
router.get("/categories", verifyToken, controller.getCategories);
router.put("/categories/:id", verifyToken, checkRole("admin"), controller.updateCategory);
router.delete("/categories/:id", verifyToken, checkRole("admin"), controller.deleteCategory);

module.exports = router;