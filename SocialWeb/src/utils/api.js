import axios from "axios";

const baseURL = "http://localhost:5080"; // Your API's base URL

//Authentication
export const checkAuthAPI = async () =>
  await axios.post(`${baseURL}/check-auth`);

export const loginAPI = async (email, password) =>
  await axios.post(`${baseURL}/login`, { email, password });

export const logoutAPI = () => axios.post(`${baseURL}/logout`);

// User
export const createUserAPI = (userData) =>
  axios.post(`${baseURL}/user`, userData);

export const uppdateUserAPI = (formData) =>
  axios.post(`${baseURL}/user/update`, formData);

export const getProfileAPI = () => axios.get(`${baseURL}/user/profile`);

export const deleteAccountAPI = () => axios.post(`${baseURL}/user/deleteUser`);

// Other Users
export const getUserDataAPI = (user_id) =>
  axios.get(`${baseURL}/user/${user_id}`);

// Posts
export const createPostAPI = async (content) =>
  await axios.post(`${baseURL}/post`, { content });

export const deletePostAPI = (id) => axios.post(`${baseURL}/post/remove/${id}`);

export const getAllFeedAPI = () => axios.get(`${baseURL}/post/allfeed`);

// Following Operations
export const addFollowingAPI = (id) =>
  axios.post(`${baseURL}/follow/add/${id}`);

export const removeFollowingAPI = (id) =>
  axios.post(`${baseURL}/follow/remove/${id}`);

export const getFollowFeedAPI = () => axios.get(`${baseURL}/post/feed`);
