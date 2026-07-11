import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../Css/Tasks.css";

function EditTask() {

    const { id } = useParams();
    const navigate = useNavigate();

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

        const fetchTask = async () => {

            try {

                const res = await API.get(`/tasks/${id}`);

                const data = res.data.task;

                setTask({
                    title: data.title,
                    description: data.description,
                    assignedTo: data.assignedTo?._id || "",
                    priority: data.priority,
                    status: data.status,
                    dueDate: data.dueDate
                        ? data.dueDate.substring(0, 10)
                        : "",
                });

            } catch (error) {

                console.log(error);
                alert("Unable to fetch task");

            }

        };

        const fetchUsers = async () => {

            try {

                const res = await API.get("/users");

                setUsers(res.data.users);

            } catch (error) {

                console.log(error);

            }

        };

        fetchTask();
        fetchUsers();

    }, [id]);

    const handleChange = (e) => {

        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });

    };

    const updateTask = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/tasks/${id}`, task);

            alert("Task Updated Successfully");

            navigate("/tasks");

        } catch (error) {

            console.log(error);

            alert("Unable to update task");

        }

    };

    return (

        <div className="form-container">

            <h2>Edit Task</h2>

            <form onSubmit={updateTask}>

                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    required
                />

                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />

                <select
                    name="assignedTo"
                    value={task.assignedTo}
                    onChange={handleChange}
                    required
                >
                    <option value="">Assign User</option>

                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
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
                    Update Task
                </button>

            </form>

        </div>

    );

}

export default EditTask;