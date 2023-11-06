import axios from "./axios";

export const RolesAll = async () => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.get("/api/roles", {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

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

export const CreateRole = async (role) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.post("/api/roles/create", role, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateRole = async (roleID, newRole) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.put(`/api/roles/${roleID}`, newRole, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteRole = async (roleID) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.delete(`/api/roles/${roleID}`, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};
