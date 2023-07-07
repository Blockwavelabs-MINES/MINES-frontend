import axios from "axios";
import { privateHeaders } from "./base";

// 보류
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

// 소셜 계정 연동
export const connectSocial = async (code, socialType) => {
  let returnValue;

  await axios.post(`/social/connect?code=${code}`,
    {
      socialType: socialType,
    },
    {
      headers: privateHeaders,
    }
  )
  .then((res) => {
    returnValue = res.data.data;
  });

  return returnValue;
};

//소셜 계정 연동 해제
export const disconnectSocial = async (socialType) => {
  let returnValue;

  await axios.put("/social/disconnect",
    {
      socialType: socialType,
    },
    {
      headers: privateHeaders,
    }
  )
  .then((res) => {
    returnValue = res;
  })
  .catch((error) => {
    console.error(error);
  });

  return returnValue;
};

// 소셜 OAuth2.0 토큰 재발급
export const refreshSocialToken = async (
  socialType,
  linkKey,
  dateInFormat,
  tokenAmount
) => {
  let returnValue = 0;

  await axios.put("/social/refresh",
      {
        socialType: socialType,
      },
      {
        headers: privateHeaders,
      }
    )
    .then((res) => {
      console.log("소셜 토큰 재발급 성공");
      console.log(res);
      returnValue = res.data;
      // 일단 보류.. (아직 트위터만)
      postTweet(linkKey, dateInFormat, tokenAmount);
    })
    .catch((error) => {
      console.log("소셜 토큰 재발급 실패");
      console.log(error);
    });

  return returnValue;
};

//트위터 포스팅.
export const postTweet = async (linkKey, dateInFormat, tokenAmount) => {
  let returnValue;
  await axios
    .post(
      `/trxs/post/tweet?link-key=${linkKey}`,
      {
        receivedTime: dateInFormat,
        tokenAmount: tokenAmount,
      },
      {
        headers: privateHeaders,
      }
    )
    .then((data) => {
      returnValue = data.data;
      console.log("포스팅 성공");
    })
    .catch((e) => {
      console.log(e);
      refreshSocialToken("TWITTER", linkKey, dateInFormat, tokenAmount);
      console.log("포스팅 실패");
    });

  return returnValue;
};
