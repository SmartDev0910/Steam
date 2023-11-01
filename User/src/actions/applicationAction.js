import axios from "./axios";

export const ListApplicationTypes = async () => {
  try {
    const response = await axios.get(`/api/application_types`);
    return response;
  } catch (error) {
    return error;
  }
};

export const ListApplicationTypeById = async (id) => {
  try {
    const response = await axios.get(`/api/application_types/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const Apply = async (memberID, applicationTypeId, audio) => {
  try {
    const response = await axios.post(`/api/members/${memberID}/apply`, {applicationTypeId, audio});
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
