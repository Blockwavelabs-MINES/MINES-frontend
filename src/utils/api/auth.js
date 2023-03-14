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
    });
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

export const createUserId = async (newId, accessToken) => {
  let returnValue;
  await axios
    .put(
      process.env.REACT_APP_DB_HOST_NEW + `/users/edit/userid?new_id=${newId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    )
    .then((response) => {
      returnValue = response.data;
    });
  return returnValue;
};

export const editProfile = async (userID, formData) => {
  //   const formData = new FormData();
  //   formData.append(
  //     "json",
  //     `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "profileName":"${profileName}", "profileBio":"${profileBio}"}`
  //   );
  const currentLang = JSON.parse(localStorage.getItem("language"));
  let langFile = {};
  if (currentLang) {
    langFile = languageList[currentLang.id].text;
  }

  var requestOptions = {
    method: "PATCH",
    headers: {
      "Access-Control-Allow-Private-Network": true,
      "Access-Control-Request-Private-Network": true,
      // "Content-Type": "application/json",
    },
    body: formData,
    redirect: "follow",
  };

  let returnValue = {};

  await fetch(
    process.env.REACT_APP_DB_HOST + `/users/userInfo?userId=${userID}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      returnValue = JSON.parse(result);
      console.log(returnValue);
      if (returnValue?.code == 404) {
        alert(langFile?.sessionError);
        localStorage.clear();
        window.location.href = "/";
      }
      return returnValue;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const getUserInfo = async (userId) => {
  let returnValue = 0;
  await axios
    .get(process.env.REACT_APP_DB_HOST + `/users?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
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
