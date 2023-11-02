import axios from "./axios";

export const ApplicationTypesAll = async () => {
  try {
    const response = await axios.get("/api/application_types");
    return response;
  } catch (error) {
    return error;
  }
};
