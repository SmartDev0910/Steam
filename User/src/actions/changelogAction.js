import axios from "./axios";

export const GetAllChangeLogs = async () => {
  try {
    const response = await axios.get(`/change-log/all`);
    return response;
  } catch (error) {
    return error;
  }
};
