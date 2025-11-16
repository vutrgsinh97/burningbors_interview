import { apiConfig } from "@/configs/app";
import axios, { AxiosResponse } from "axios";


const instancePrivacy = axios.create({
  baseURL: apiConfig.endpoint,
  headers: { Accept: "application/json" },
});

instancePrivacy.interceptors.request.use(
  (config) => {
    // Get Token here
    const accessToken = '';

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config
  },
  (error) => Promise.reject(error)
);

instancePrivacy.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error?.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default instancePrivacy;