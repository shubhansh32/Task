const Task = require("../Models/TaskModel");
const User = require("../Models/UserModel");

// ===================================
// Admin Dashboard
// ===================================
const getAdminDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalTasks = await Task.countDocuments();

    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const highPriority = await Task.countDocuments({
      priority: "High",
    });

    const recentTasks = await Task.find()
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
        highPriority,
        recentTasks,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===================================
// Member Dashboard
// ===================================
const getMemberDashboard = async (req, res) => {
  try {

    const userId = req.params.userId;

    const totalTasks = await Task.countDocuments({
      assignedTo: userId,
    });

    const pendingTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "Pending",
    });

    const inProgressTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "In Progress",
    });

    const completedTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "Completed",
    });

    const myTasks = await Task.find({
      assignedTo: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
        myTasks,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getAdminDashboard,
  getMemberDashboard,
};