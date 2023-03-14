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

export const getLink = async (userId) => {
  let resultValue = 0;
  await axios
    .get(
      process.env.REACT_APP_DB_HOST_NEW + `/public/link/all?user_id=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      resultValue = data.data.resultData;
    });
  return resultValue;
};

export const addLink = async (userId, linkTitle, linkUrl) => {
  const currentLang = JSON.parse(localStorage.getItem("language"));
  let langFile = {};
  if (currentLang) {
    langFile = languageList[currentLang.id].text;
  }

  let returnValue = 0;
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST + `/links/new?userId=${userId}`,
      `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "jwtToken":"${
        JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO_NAME)
        )?.jwtToken
      }", "linkTitle":"${linkTitle}", "linkUrl":"${linkUrl}"}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      if (data.data?.code == 404) {
        alert(langFile?.sessionError);
        localStorage.clear();
        window.location.href = "/";
      }
      returnValue = data.data.result;
    });

  return returnValue;
};

export const deleteLink = async (userId, linkIndex) => {
  const currentLang = JSON.parse(localStorage.getItem("language"));
  let langFile = {};
  if (currentLang) {
    langFile = languageList[currentLang.id].text;
  }

  let returnValue = 0;
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST +
        `/links/delete?userId=${userId}&linkIndex=${linkIndex}`,
      `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "jwtToken":"${
        JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO_NAME)
        )?.jwtToken
      }"}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    // .delete(process.env.REACT_APP_DB_HOST + `/links?linkIndex=${linkIndex}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    .then((data) => {
      console.log(data.data);
      if (data.data?.code == 404) {
        alert(langFile?.sessionError);
        localStorage.clear();
        window.location.href = "/";
      }
      returnValue = data.data.result;
    });

  return returnValue;
};

export const editLink = async (userId, linkIndex, linkTitle, linkUrl) => {
  const currentLang = JSON.parse(localStorage.getItem("language"));
  let langFile = {};
  if (currentLang) {
    langFile = languageList[currentLang.id].text;
  }

  var requestOptions = {
    method: "PATCH",
    headers: {
      // "Access-Control-Allow-Private-Network": true,
      // "Access-Control-Request-Private-Network": true,
      "Content-Type": "application/json",
    },
    body: `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "jwtToken":"${
      JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO_NAME)
      )?.jwtToken
    }", "linkTitle":"${linkTitle}", "linkUrl":"${linkUrl}"}`,
    redirect: "follow",
  };

  let returnValue = {};

  const result = await fetch(
    process.env.REACT_APP_DB_HOST +
      `/links?userId=${userId}&linkIndex=${linkIndex}`,
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
    })
    .catch((error) => console.log("error", error));

  return returnValue;
};
