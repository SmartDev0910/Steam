import axios from "./axios";

export const ApplicationTypesAll = async () => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.get("/api/application_types", {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const CreateApplicationType = async (applicationType) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.post("/api/application_types/create", applicationType, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const ApplicationList = async (applicationType) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.get(`/api/application_types/${applicationType}/list`, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const ReviewApplication = async (memberID, application) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.post(`/api/members/${memberID}/review_application`, application, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};