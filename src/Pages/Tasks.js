import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import Sidebar from "../Component/Sidebar";
import Navbar from "../Component/Navbar";

import "../Css/Tasks.css";

function Tasks() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    // =============================
    // Get All Tasks
    // =============================

    const getTasks = async () => {

        try {

            const res = await API.get("/tasks");

            setTasks(res.data.tasks);

        } catch (error) {

            console.log(error);

            alert("Unable to fetch tasks");

        }

    };

    // =============================
    // Delete Task
    // =============================

    const deleteTask = async (id) => {

        const confirmDelete = window.confirm("Delete this task?");

        if (!confirmDelete) return;

        try {

            await API.delete(`/tasks/${id}`);

            alert("Task Deleted Successfully");

            getTasks();

        } catch (error) {

            console.log(error);

            alert("Unable to delete task");

        }

    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="task-container">

                    <div className="task-header">

                        <h2>Task Management</h2>

                        <button
                            className="add-task-btn"
                            onClick={() => navigate("/add-task")}
                        >
                            + Create Task
                        </button>

                    </div>

                    <table>

                        <thead>

                            <tr>

                                <th>Title</th>
                                <th>Description</th>

                                <th>Assigned To</th>

                                <th>Priority</th>

                                <th>Status</th>

                                <th>Due Date</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                tasks.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "30px"
                                                }}
                                            >

                                                No Tasks Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    tasks.map((task) => (

                                        <tr key={task._id}>

                                            <td>{task.title}</td>

                                                <td className="description">
    {task.description}
</td>
                                            <td>

                                                {task.assignedTo?.name || "Not Assigned"}

                                            </td>

                                            <td>{task.priority}</td>

                                            <td>{task.status}</td>

                                            <td>

                                                {
                                                    task.dueDate
                                                        ? new Date(task.dueDate).toLocaleDateString()
                                                        : "-"
                                                }

                                            </td>

                                            <td>

                                                <button
                                                    className="edit-btn"
                                                    onClick={() => navigate(`/edit-task/${task._id}`)}
                                                >

                                                    Edit

                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => deleteTask(task._id)}
                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Tasks;