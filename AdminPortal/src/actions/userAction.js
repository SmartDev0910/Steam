import axios from "./axios";

export const userLogin = async (email, password) => {
  try {
    const response = await axios.post("/user/signin", { email, password });
    return response;
  } catch (error) {
    return error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post("/user/create", user);
    return response;
  } catch (error) {
    return error;
  }
};

export const allUsers = async () => {
  try {
    const response = await axios.get("/user/all");
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/user/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const detailUser = async (id) => {
  try {
    const response = await axios.get(`/user/detail/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const editUser = async (id, user) => {
  try {
    const response = await axios.post(`/user/edit/${id}`, user);
    return response;
  } catch (error) {
    return error;
  }
};
