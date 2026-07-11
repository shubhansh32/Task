const express = require("express");

const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByUser,
  updateTask,
  changeTaskStatus,
  deleteTask,
} = require("../controller/taskController");

router.post("/", createTask);

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.get("/user/:userId", getTasksByUser);

router.put("/:id", updateTask);

router.patch("/:id/status", changeTaskStatus);

router.delete("/:id", deleteTask);

module.exports = router;