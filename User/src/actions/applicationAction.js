import axios from "./axios";

export const CreateApplication = async (steam64, application) => {
  try {
    const response = await axios.post(`/application/create/${steam64}`, application);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetApplicationBySteam64 = async (steam64) => {
  try {
    const response = await axios.get(`/application/${steam64}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const fileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/upload", formData);
    return response;
  } catch (error) {
    return error;
  }
};
