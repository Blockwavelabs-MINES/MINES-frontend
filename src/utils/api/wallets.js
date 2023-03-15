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

export const getWallet = async (userId) => {
  let resultValue = 0;
  await axios
    .get(
      process.env.REACT_APP_DB_HOST_NEW +
        `/public/wallets/all?userId=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      resultValue = data.data;
    });
  return resultValue;
};

export const addWallet = async (walletType, walletAddress) => {
  const currentLang = JSON.parse(localStorage.getItem("language"));
  let langFile = {};
  if (currentLang) {
    langFile = languageList[currentLang.id].text;
  }

  let returnValue = 0;
  await axios
    .post(
      process.env.REACT_APP_DB_HOST_NEW + "/wallets/new",
      {
        wallet_type: walletType,
        wallet_address: walletAddress,
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

export const deleteWallet = async (userWalletIndex) => {
  const currentLang = JSON.parse(localStorage.getItem("language"));
  let langFile = {};
  if (currentLang) {
    langFile = languageList[currentLang.id].text;
  }

  let returnValue = 0;
  await axios
    .delete(
      process.env.REACT_APP_DB_HOST_NEW +
        `/wallets?userWalletIndex=${userWalletIndex}`,
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
