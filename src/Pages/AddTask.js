import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../Css/Tasks.css";

function AddTask() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [users, setUsers] = useState([]);

    const [task, setTask] = useState({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    // ===============================
    // Fetch Users
    // ===============================

    const fetchUsers = async () => {

        try {

            const res = await API.get("/users");

            setUsers(res.data.users);

        } catch (error) {

            console.log(error);

        }

    };

    // ===============================
    // Handle Input
    // ===============================

    const handleChange = (e) => {

        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });

    };

    // ===============================
    // Create Task
    // ===============================

    const createTask = async (e) => {

        e.preventDefault();

        try {

            await API.post("/tasks", {

                ...task,

                assignedBy: user.id

            });

            alert("Task Created Successfully");

            navigate("/tasks");

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to create task");

        }

    };

    return (

        <div className="form-container">

            <h2>Create Task</h2>

            <form onSubmit={createTask}>

                <input
                    type="text"
                    placeholder="Task Title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    placeholder="Description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    required
                />

                <select
                    name="assignedTo"
                    value={task.assignedTo}
                    onChange={handleChange}
                    required
                >

                    <option value="">Assign User</option>

                    {
                        users.map((user) => (

                            <option
                                key={user._id}
                                value={user._id}
                            >

                                {user.name}

                            </option>

                        ))
                    }

                </select>

                <select
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                >

                    <option value="Low">Low</option>

                    <option value="Medium">Medium</option>

                    <option value="High">High</option>

                </select>

                <select
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                >

                    <option value="Pending">Pending</option>

                    <option value="In Progress">In Progress</option>

                    <option value="Completed">Completed</option>

                </select>

                <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                />

                <button type="submit">

                    Create Task

                </button>

            </form>

        </div>

    );

}

export default AddTask;