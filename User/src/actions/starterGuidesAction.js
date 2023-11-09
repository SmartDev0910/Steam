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
