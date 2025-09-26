import axios from "axios";
import { useAuthStore } from "../../auth/store/auth.store";

export const api = axios.create({
  baseURL: "https://the-one-api.dev/v2",
});

api.interceptors.request.use((config) => {
  const storeToken = useAuthStore.getState().token;
  const envToken = process.env.REACT_APP_ONE_API_TOKEN;
  const token = storeToken || envToken;
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any)["Authorization"] = `Bearer -rSTp9SJXwqJQM5bhsvI`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);
