import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;

export default () => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const token = localStorage.getItem("token");

  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `${token}`;
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        location.reload();
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
