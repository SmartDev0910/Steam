import axios from "axios";
import { REACT_APP_SERVER_IP } from "actions/config";

const axiosInstance = axios.create({ baseURL: REACT_APP_SERVER_IP });
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
);

export default axiosInstance;
