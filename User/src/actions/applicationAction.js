import axios from "./axios";

export const CreateApplication = async (steam64, application) => {
  try {
    const response = await axios.post(`/application/create/${steam64}`, application);
    return response;
  } catch (error) {
    return error;
  }
};
