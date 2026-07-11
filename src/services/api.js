import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-backend-cvea.onrender.com/api",
});

export default API;