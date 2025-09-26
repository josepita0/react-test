import axios from "axios";

export const api = axios.create({
  baseURL: "https://the-one-api.dev/v2",
});

api.interceptors.request.use((config) => {
  const envToken = process.env.REACT_APP_ONE_API_TOKEN;
  const token = envToken;
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);
