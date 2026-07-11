import React from "react";
import { Link } from "react-router-dom";

import "../Css/Sidebar.css";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2>Task Manager</h2>

            <Link to="/dashboard">Dashboard</Link>

            <Link to="/users">Users</Link>

            <Link to="/tasks">Tasks</Link>

            <Link to="/">Logout</Link>


        </div>

    );

}

export default Sidebar;