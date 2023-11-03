import axios from "./axios";

export const MembersSignIn = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/signin", { email, password });
    return response;
  } catch (error) {
    return error;
  }
};

export const MembersCreate = async (member) => {
  try {
    const response = await axios.post("/api/auth/signup", member);
    return response;
  } catch (error) {
    return error;
  }
};

export const MembersUpdate = async (id, member) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.put(`/api/members/${id}`, member, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};

export const ChangePassword = async (id, member) => {
  try {
    const authorization = JSON.parse(localStorage.getItem("token"))
    const response = await axios.post(`/api/members/${id}/change_password`, member, {
			headers: {
				authorization
			}
		});
    return response;
  } catch (error) {
    return error;
  }
};