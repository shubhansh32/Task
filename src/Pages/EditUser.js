import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch user");
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/users/${id}`, user);

      alert("User Updated Successfully");

      navigate("/users");
    } catch (error) {
      console.log(error);
      alert("Failed to update user");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Edit User</h2>

      <form onSubmit={updateUser}>

        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <br /><br />

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <br /><br />

        <select
          name="role"
          value={user.role}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>

        <br /><br />

        <button type="submit">
          Update User
        </button>

      </form>
    </div>
  );
}

export default EditUser;