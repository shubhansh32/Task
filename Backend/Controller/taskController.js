const Task = require("../models/TaskModel");

// ==============================
// Create Task
// ==============================
const createTask = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==============================
// Get All Tasks (Admin)
// ==============================
const getAllTasks = async (req, res) => {
  try {

    const tasks = await Task.find()
      .populate("assignedBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: tasks.length,
      tasks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==============================
// Get Single Task
// ==============================
const getTaskById = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id)
      .populate("assignedBy", "name email")
      .populate("assignedTo", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// Get Tasks By User
// ==============================
const getTasksByUser = async (req, res) => {

  try {

    const tasks = await Task.find({
      assignedTo: req.params.userId,
    })
      .populate("assignedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: tasks.length,
      tasks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// Update Task
// ==============================
const updateTask = async (req, res) => {

  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// Change Task Status
// ==============================
const changeTaskStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status Updated",
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// Delete Task
// ==============================
const deleteTask = async (req, res) => {

  try {

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByUser,
  updateTask,
  changeTaskStatus,
  deleteTask,
};