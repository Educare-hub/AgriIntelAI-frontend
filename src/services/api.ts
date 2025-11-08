import axios from "axios";

const api = axios.create({
  baseURL: "https://agriintelai-backend-renwjwq3x-johnmwangis-projects.vercel.app/api",
});

export default api;
