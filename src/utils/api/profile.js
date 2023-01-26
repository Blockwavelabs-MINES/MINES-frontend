import axios from "axios";

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

export const getProfileDeco = async (userIndex) => {
  let returnValue = 0;
  const result = await axios
    .get(
      process.env.REACT_APP_DB_HOST +
        `/users/userInfo?userIndex=${userIndex}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
    });

  return returnValue;
};


export const editDecoBackground = async (userID, formData) => {
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
    },
    body: formData,
    redirect: "follow",
  };

  let returnValue = {};

  const result = await fetch(
    process.env.REACT_APP_DB_HOST +
      `/users/profile/decorate/background?userId=${userID}`,
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

export const editDecoButton = async (userId, btnColor, btnFontColor) => {
  var requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{"jwtToken":"${
      JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO_NAME)
      )?.jwtToken
    }", "btnColor":"${btnColor}", "btnFontColor":"${btnFontColor}"}`,
    redirect: "follow",
  };

  let returnValue = {};

  const result = await fetch(
    process.env.REACT_APP_DB_HOST +
      `/users/profile/decorate/button?userId=${userId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      returnValue = JSON.parse(result);
      console.log(returnValue);
    })
    .catch((error) => console.log("error", error));

  return returnValue;
};

export const editDecoFont = async (userId, fontColor) => {
  var requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{"jwtToken":"${
      JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO_NAME)
      )?.jwtToken
    }", "fontColor":"${fontColor}"}`,
    redirect: "follow",
  };

  let returnValue = {};

  const result = await fetch(
    process.env.REACT_APP_DB_HOST +
      `/users/profile/decorate/font?userId=${userId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      returnValue = JSON.parse(result);
      console.log(returnValue);
    })
    .catch((error) => console.log("error", error));

  return returnValue;
};
