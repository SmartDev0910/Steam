import axios from "./axios";

export const GetAllChangeLogs = async () => {
  try {
    const response = await axios.get(`/change-log/all`);
    return response;
  } catch (error) {
    return error;
  }
};

export const CreateChangeLog = async (changelog) => {
  try {
    const response = await axios.post(`/change-log/create`, changelog);
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteChangeLog = async (id) => {
  try {
    const response = await axios.delete(`/change-log/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
