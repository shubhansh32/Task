import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddUser() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "member",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/auth/register", user);

            alert(res.data.message);

            navigate("/users");

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Registration Failed");

        }

    };

    return (

        <div style={{ padding: "40px" }}>

            <h2>Add User</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={user.name}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <select
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>

                <br /><br />

                <button type="submit">
                    Create User
                </button>

            </form>

        </div>

    );
}

export default AddUser;