import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  return API.post("/resume/upload", formData);
};

export const fetchResumeHistory = () =>
  API.get("/resume/all");

