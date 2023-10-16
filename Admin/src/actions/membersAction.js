import axios from "./axios";

export const MembersSignIn = async (email, password) => {
  try {
    const response = await axios.post("/members/signin", { email, password });
    return response;
  } catch (error) {
    return error;
  }
};

export const MembersCreate = async (member) => {
  try {
    const response = await axios.post("/members/create", member);
    return response;
  } catch (error) {
    return error;
  }
};

export const MembersAll = async () => {
  try {
    const response = await axios.get("/members/all");
    return response;
  } catch (error) {
    return error;
  }
};

export const MembersDetail = async (steam64) => {
  try {
    const response = await axios.get(`/members/detail/${steam64}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const MembersUpdate = async (steam64, member) => {
  try {
    const response = await axios.post(`/members/update/${steam64}`, member);
    return response;
  } catch (error) {
    return error;
  }
};

export const MembersWhiteList = async (steam64) => {
  try {
    const response = await axios.post(`/members/whitelist/${steam64}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const MembersBan = async (steam64, isBanned) => {
  try {
    const response = await axios.post(`/members/ban/${steam64}`, { isBanned: isBanned });
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteMembers = async (id) => {
  try {
    const response = await axios.delete(`/members/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
