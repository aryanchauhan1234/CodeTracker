import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});
<<<<<<< HEAD
=======
// lib/axios.js
// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:5001/api", // Make sure it's port 5000 (backend)
//   withCredentials: true,
// });

>>>>>>> 4345ce6 (update1)
