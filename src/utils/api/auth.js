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

// export const createUser = async (socialID, socialPlatform, accessToken) => {
//   let returnValue = 0;
//   await axios
//     .post(
//       process.env.REACT_APP_DB_HOST + `/users/signup`,
//       `{"accessToken":"${accessToken}", "socialID":"${socialID}", "socialPlatform":"${socialPlatform}"}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((data) => {
//       console.log(data.data);
//       returnValue = data.data.result;
//     });

//   return returnValue;
// };

// export const loginUser = async () => {
//   let returnValue = 0;
//   await axios
//     .post(process.env.REACT_APP_DB_HOST_NEW + `/public/users/google`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((data) => {
//       console.log(data.data);
//       returnValue = data.data.result;
//       setLocalUserInfo({ type: "init", data: returnValue });
//     });

//   return returnValue;
// };

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

export const getUserInfoByIndex = async (userIndex) => {
  let returnValue = 0;
  await axios
    .get(
      process.env.REACT_APP_DB_HOST + `/users/userInfo?userIndex=${userIndex}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

//이게 꼭 필요한가?

export const getInfoFromAccessToken = async (accessToken) => {
  let returnValue = 0;
  await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};
