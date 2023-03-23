import axios from "axios";
import { requestRefreshToken } from "./auth";

axios.defaults.baseURL = process.env.REACT_APP_DB_HOST_NEW;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const privateHeaders = {
  Authorization: "Bearer " + localStorage.getItem("accessToken"),
};

export const privateHeadersMultipart = {
  "Content-Type": "multipart/form-data",
  Authorization: "Bearer " + localStorage.getItem("accessToken"),
};

export const handleTokenExpired = (error) => {
  if (error.response.status === 401) {
    requestRefreshToken()
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  }

  return;
};
