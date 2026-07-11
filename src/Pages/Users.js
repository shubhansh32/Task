import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../Css/Users.css";
import Sidebar from "../Component/Sidebar";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";

function Users() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const res = await API.get("/users");
            setUsers(res.data.users);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        try {

            await API.delete(`/users/${id}`);

            alert("User Deleted");

            getUsers();

        } catch (err) {

            console.log(err);

        }
    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="user-container">

                    <div className="user-header">

                        <h2>Users</h2>

                        <button onClick={() => navigate("/add-user")}>
    Add User
</button>

                    </div>

                    <table>

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Role</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr key={user._id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.role}</td>

                                    <td>

                                       <button onClick={() => navigate(`/edit-user/${user._id}`)}>
  Edit
</button>

                                        <button
                                            className="delete"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default Users;