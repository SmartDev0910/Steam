import axios from "./axios";

export const StarterGuidesAll = async () => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.get("/api/starter_guides", {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const CreateStarterGuide = async (starterGuide) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.post("/api/starter_guides/create", starterGuide, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const StarterGuideUpdate = async (id, starterGuide) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.put(`/api/starter_guides/${id}`, starterGuide, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

