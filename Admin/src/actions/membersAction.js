import axios from "./axios";

export const MembersSignIn = async (email, password) => {
  try {
    const response = await axios.post("/api/members/signin", { email, password });
    return response;
  } catch (error) {
    return error;
  }
};

export const MembersAll = async () => {
  try {
    const response = await axios.get("/api/members");
    return response;
  } catch (error) {
    return error;
  }
};

export const MembersUpdate = async (id, member) => {
  try {
    const response = await axios.put(`/api/members/${id}`, member);
    return response;
  } catch (error) {
    return error;
  }
};
