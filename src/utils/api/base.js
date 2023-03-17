import { requestRefreshToken } from "./auth";

export const handleTokenExpired = (error) => {
  if (error.response.status === 401) {
    console.log("401 error handling");
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
