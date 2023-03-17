import axios from "axios";
import { setLocalUserInfo } from "../functions/setLocalVariable";

import langEn from "../lang/lang.en.json";
import langKo from "../lang/lang.ko.json";

const languageList = [
  {
    lang: "ko",
    id: 0,
    text: langKo,
  },
  {
    lang: "en",
    id: 1,
    text: langEn,
  },
];

export const requestLogin = async (code) => {
  let returnValue;
  await axios
    .get(
      process.env.REACT_APP_DB_HOST_NEW +
        `/public/users/login/google?code=${code}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      localStorage.setItem(
        "accessToken",
        data.data.resultData.tokenDto.access_token
      );
      //회원가입과 로그인 여부.
      returnValue = data.data.resultData.socialLoginResponse.status;
    });
  return returnValue;
};

export const checkUserId = async (userID) => {
  let returnValue;
  await axios
    .get(
      process.env.REACT_APP_DB_HOST_NEW +
        `/public/users/id/check?user_id=${userID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      returnValue = data.data;
    });
  return returnValue;
};

export const createUserId = async (newId) => {
  let returnValue;
  await axios
    .put(
      process.env.REACT_APP_DB_HOST_NEW + `/users/edit/userid?new_id=${newId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    .then((response) => {
      returnValue = response.data;
    });
  return returnValue;
};

export const editProfile = async (formData) => {
  const currentLang = JSON.parse(localStorage.getItem("language"));
  let langFile = {};
  if (currentLang) {
    langFile = languageList[currentLang.id].text;
  }

  let returnValue = {};

  await axios
    .put(process.env.REACT_APP_DB_HOST_NEW + `/users/edit/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
    .then((result) => {
      returnValue = result.data.resultData;
    })
    .catch((error) => {
      console.log("error", error);
    });

  return returnValue;
};

export const getUserInfo = async () => {
  let returnValue = 0;
  await axios
    .get(process.env.REACT_APP_DB_HOST_NEW + `/users/my/info`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

export const getUserInfoAndProfileDeco = async (userId) => {
  let returnValue = 0;
  await axios
    .get(
      process.env.REACT_APP_DB_HOST_NEW +
        `/public/users/info?user_id=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};
