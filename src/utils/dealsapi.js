import axios from "axios";

// Fallback URL in case the env variable is missing
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://donjay-server-mw7v-4klcotyzr-jaytechs-projects-e325c32a.vercel.app/";

const dealsApi = axios.create({
  baseURL: `${BASE_URL}/api/deals`,
});

dealsApi.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default dealsApi;
