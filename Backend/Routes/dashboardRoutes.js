const express = require("express");

const router = express.Router();

const {
  getAdminDashboard,
  getMemberDashboard,
} = require("../Controller/dashBoardController");

router.get("/admin", getAdminDashboard);

router.get("/member/:userId", getMemberDashboard);

module.exports = router;