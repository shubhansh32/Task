import React, { useState } from "react";
import "../Css/Login.css";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/auth/login", formData);

            alert(res.data.message);

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            localStorage.setItem(
    "role",
    res.data.user.role
);

            navigate("/DashBoard");

        }catch (err) {

    console.log("Full Error:", err);

    console.log("Response:", err.response);

    console.log("Data:", err.response?.data);

    console.log("Status:", err.response?.status);

    alert(err.response?.data?.message || "Login Failed");

}
    };

    return (
        <div className="login">

            <div className="login-box">

                <h1>Task Manager</h1>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;