const express = require("express");

const router = express.Router();

const {
  getAdminDashboard,
  getMemberDashboard,
} = require("../controller/dashboardController");

router.get("/admin", getAdminDashboard);

router.get("/member/:userId", getMemberDashboard);

module.exports = router;