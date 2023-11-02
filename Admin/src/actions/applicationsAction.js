import axios from "./axios";

export const ApplicationTypesAll = async () => {
  try {
    const response = await axios.get("/api/application_types");
    return response;
  } catch (error) {
    return error;
  }
};

export const CreateApplicationType = async (applicationType) => {
  try {
    const response = await axios.post("/api/application_types/create", applicationType);
    return response;
  } catch (error) {
    return error;
  }
};

export const ApplicationList = async (applicationType) => {
  try {
    const response = await axios.get(`/api/application_types/${applicationType}/list`);
    return response;
  } catch (error) {
    return error;
  }
};

export const ReviewApplication = async (memberID, application) => {
  try {
    const response = await axios.post(`/api/members/${memberID}/review_application`, application);
    return response;
  } catch (error) {
    return error;
  }
};