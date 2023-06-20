import axios from "axios";
import { privateHeaders } from "./base";

export const getSocialConnectList = async () => {
  let returnValue;
  await axios
    .get(`/profile/social`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
    .then((data) => {
      returnValue = data.data;
    })
    .catch((error) => {});
  return returnValue;
};

//소셜 로그인 연동.
export const connectTwitter = async (code) => {
  let returnValue;
  await axios
    .post(
      "/auth/connect",
      {
        code: code,
        socialPlatformType: "TWITTER",
      },
      {
        headers: privateHeaders,
      }
    )
    .then((data) => {
      returnValue = data.data;
    });

  return returnValue;
};

//소셜 로그인 연동 해제.
export const disconnectTwitter = async (code) => {
  let returnValue;
  await axios
    .put(
      "/auth/disconnect",
      {
        socialPlatformType: "TWITTER",
      },
      {
        headers: privateHeaders,
      }
    )
    .then((data) => {
      returnValue = data;
    })
    .catch(() => {});

  return returnValue;
};

//트위터 토큰 재발급.
export const refreshTwitterToken = async () => {
  let returnValue = 0;
  await axios
    .put(
      "/auth/twitter/refresh",
      {},
      {
        headers: privateHeaders,
      }
    )
    .then((data) => {
      returnValue = data.data;
    })
    .catch(() => {});

  return returnValue;
};

//트위터 포스팅.
export const postTweet = async (linkKey) => {
  let returnValue;
  await axios
    .get(`/trxs/post/tweet?link-key=${linkKey}`)
    .then((data) => {
      returnValue = data.data;
    })
    .catch(() => {});

  return returnValue;
};
