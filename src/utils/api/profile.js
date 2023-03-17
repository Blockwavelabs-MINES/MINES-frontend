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

export const getProfileDeco = async (userId) => {
  let returnValue = 0;
  await axios
    .get(
      process.env.REACT_APP_DB_HOST_NEW + `/public/profile?user_id=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      returnValue = data.data.resultData;
    });

  return returnValue;
};

export const editProfileDeco = async (formData) => {
  let returnValue;
  await axios
    .put(process.env.REACT_APP_DB_HOST_NEW + `/profile/edit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
    .then((data) => {
      returnValue = data.data.resultData;
    });
  return returnValue;
};
