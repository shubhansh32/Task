import React, { useEffect, useState } from "react";
import "../Css/Dashboard.css";
import API from "../services/api";

import Sidebar from "../Component/Sidebar";
import Navbar from "../Component/Navbar";
import DashboardCard from "../Component/DashboardCard";

function DashBoard() {

    const [dashboard, setDashboard] = useState({});

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const res = await API.get("/dashboard/admin");

            setDashboard(res.data.dashboard);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="cards">

                    <DashboardCard
                        title="Total Users"
                        value={dashboard.totalUsers || 0}
                    />

                    <DashboardCard
                        title="Total Tasks"
                        value={dashboard.totalTasks || 0}
                    />

                    <DashboardCard
                        title="Pending"
                        value={dashboard.pendingTasks || 0}
                    />

                    <DashboardCard
                        title="Completed"
                        value={dashboard.completedTasks || 0}
                    />

                </div>

                <div className="recent">

                    <h2>Recent Tasks</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Title</th>

                                <th>Status</th>

                                <th>Priority</th>

                            </tr>

                        </thead>

                        <tbody>

                            {dashboard.recentTasks?.map((task) => (

                                <tr key={task._id}>

                                    <td>{task.title}</td>

                                    <td>{task.status}</td>

                                    <td>{task.priority}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default DashBoard;