import { apiConfig } from "@/configs/app";
import axios, { AxiosResponse } from "axios";


const instancePublish = axios.create({
  baseURL: apiConfig.endpoint,
  headers: { Accept: "application/json" },
});

instancePublish.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instancePublish.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error?.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default instancePublish;