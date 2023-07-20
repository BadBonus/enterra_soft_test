import axios from "axios";
import { clearUser } from "@/helpers/user.js";

const baseURL = process.env.VUE_APP_BASE_URL;

export default () => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: null,
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        clearUser();
        location.reload();
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
