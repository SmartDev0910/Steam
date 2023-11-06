import axios from "./axios";

export const ListRoleById = async (roleID) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.get(`/api/roles/${roleID}`, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};
