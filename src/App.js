import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/DashBoard";
import Users from "./Pages/Users";
import EditUser from "./Pages/EditUser";
import AddUser from "./Pages/AddUser";
import Tasks from "./Pages/Tasks";
import AddTask from "./Pages/AddTask";
import EditTask from "./Pages/EditTask";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<Users />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/add-user" element={<AddUser />} />


<Route path="/tasks" element={<Tasks />} />
<Route path="/add-task" element={<AddTask />} />
<Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>

    </BrowserRouter>

  );

}

export default App;