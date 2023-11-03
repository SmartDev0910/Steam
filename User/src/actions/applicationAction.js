import axios from "./axios";

export const ListApplicationTypes = async () => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.get(`/api/application_types`, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const ListApplicationTypeById = async (id) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.get(`/api/application_types/${id}`, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const Apply = async (memberID, applicationTypeId, audio) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.post(`/api/members/${memberID}/apply`, {applicationTypeId, audio}, {
			headers: {
				authorization
			}
		});
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
