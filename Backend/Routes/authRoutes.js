const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../Controller/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", getProfile);
router.put("/profile/:id", updateProfile);

module.exports = router;