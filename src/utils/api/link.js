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

export const addLink = async (title, url) => {
  const currentLang = JSON.parse(localStorage.getItem("language"));
  let langFile = {};
  if (currentLang) {
    langFile = languageList[currentLang.id].text;
  }

  let returnValue = 0;
  await axios
    .post(
      process.env.REACT_APP_DB_HOST_NEW + "/link/add",
      {
        link_title: title,
        link_url: url,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    .then((data) => {
      returnValue = data.data;
    });

  return returnValue;
};

export const deleteLink = async (linkId) => {
  const currentLang = JSON.parse(localStorage.getItem("language"));
  let langFile = {};
  if (currentLang) {
    langFile = languageList[currentLang.id].text;
  }

  let returnValue = 0;
  await axios
    .delete(
      process.env.REACT_APP_DB_HOST_NEW + `/link/remove?link_id=${linkId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    .then((data) => {
      returnValue = data.data;
    });

  return returnValue;
};

export const editLink = async (linkId, title, url) => {
  const currentLang = JSON.parse(localStorage.getItem("language"));
  let langFile = {};
  if (currentLang) {
    langFile = languageList[currentLang.id].text;
  }

  let returnValue;
  await axios
    .put(
      process.env.REACT_APP_DB_HOST_NEW + "/link/edit",
      {
        id: linkId,
        title: title,
        url: url,
      },
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
