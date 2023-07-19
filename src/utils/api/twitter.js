import axios from "axios";
import { privateHeaders } from "./base";

// 연동된 소셜 계정 리스트 조회
export const getSocialConnectList = async () => {
  let returnValue;
  await axios
    .get('/social', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
    .then((res) => {
      returnValue = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
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
export const refreshSocialToken = async (socialType) => {
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
    })
    .catch((error) => {
      console.log("소셜 토큰 재발급 실패");
      console.log(error);
    });

  return returnValue;
};

//트위터 포스팅.
export const postTweet = async (
  tweetType,
  comment,
  tokenTicker,
  tokenAmount,
  time,
  senderUsername,
  receiverUsername
) => {
  let returnValue;
  await axios.post('/tweet',
    {
      tweetType: tweetType,
      comment: comment,
      tokenTicker: tokenTicker,
      tokenAmount: tokenAmount,
      time: time,
      senderUsername: senderUsername,
      receiverUsername: receiverUsername
    },
    {
      headers: privateHeaders,
    }
  )
  .then((res) => {
    returnValue = res.data;
    console.log("포스팅 성공");
  })
  .catch((e) => {
    if (e.response.status === 401) { 
      refreshSocialToken("TWITTER");
      postTweet(
        tweetType,
        comment,
        tokenTicker,
        tokenAmount,
        time,
        senderUsername,
        receiverUsername
      );
    }
    else {
      console.log("포스팅 실패");
    }
  });

  return returnValue;
};
