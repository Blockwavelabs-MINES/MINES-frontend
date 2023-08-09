import axios from "axios";
import {
  handleTokenExpired,
  privateHeaders,
  privateHeadersMultipart,
} from "./base";

// 구글 로그인
export const requestLogin = async (code, socialType) => {
  let returnValue;

  await axios
    .post(`/public/auth/login?code=${code}`, 
      {
        socialType: socialType
      }
    )
    .then((res) => {
      localStorage.setItem(
        "accessToken",
        res.data.data.token.accessToken
      );
      localStorage.setItem(
        "refreshToken",
        res.data.data.token.refreshToken
      );
      //회원가입 및 로그인 여부.
      returnValue = res.data.data.isSignup ? "SIGNUP" : "LOGIN";
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

// Access 토큰 재발급
export const requestRefreshToken = async () => {
  let returnValue;

  await axios.get(`/public/auth/refresh`, {
      header: {
       RefreshToken: localStorage.getItem("refreshToken"),
      }
    })
    //리프레쉬 토큰이 만료되었을 때.
    .then((res) => {
      returnValue = res;
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      window.location.reload();
    })
    .catch((error) => {
      console.log("requestRefreshToken" + error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("language");
      window.location.reload();
    });

  return returnValue;
};

// 유저 아이디 중복 확인
export const checkUserId = async (userID) => {
  let returnValue;

  await axios.get(`/public/user/id/check?user_id=${userID}`)
    .then((res) => {
      returnValue = res.data;
    })
    .catch((error) => {
      console.error("checkUserId" + error);
    });

  return returnValue;
};

// 유저 아이디 등록 & 변경
export const createUserId = async (userId) => {
  let returnValue;
  
  await axios.put(`/user/id/edit?user_id=${userId}`,
      {},
      {
        headers: privateHeaders,
      }
    )
    .then((res) => {
      returnValue = res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return returnValue;
};

// 유저 프로필 업데이트
export const editProfile = async (formData) => {
  let returnValue = {};
  await axios.put(`/user/profile/edit`, 
      formData, 
      {
        headers: privateHeadersMultipart,
      }
    )
    .then((res) => {
      returnValue = res.data.resultData;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};

// 유저(자신) 정보 조회
export const getUserInfo = async () => {
  let returnValue;

  await axios.get(`/user`, {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("accessToken")
      },
    })
    .then((res) => {
      returnValue = res.data.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 401) {
        handleTokenExpired(error);
      }
    });

  return returnValue;
};

// 유저 언어 업데이트
export const changeUserLanguage = async (newLanguage) => {
  let returnValue;
  // newLanguage: "KOR" or "ENG"
  await axios.put(`/user/language?language=${newLanguage}`,
      {},
      {
        headers: privateHeaders,
      }
    )
    .then((res) => {
      returnValue = res.data;
    });
  return returnValue;
};
