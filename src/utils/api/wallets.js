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

export const addWallet = async (
  userId,
  walletType,
  walletAddress
) => {
  const currentLang = JSON.parse(localStorage.getItem("language"))
  let langFile = {}
  if (currentLang) {
    langFile = languageList[currentLang.id].text
  }

  let returnValue = 0;
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST + `/wallets/new?userId=${userId}`,
      `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "jwtToken":"${JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO_NAME))?.jwtToken}", "walletType":"${walletType}", "walletAddress":"${walletAddress}"}`,
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

export const deleteWallet = async (userId, userWalletIndex) => {
  const currentLang = JSON.parse(localStorage.getItem("language"))
  let langFile = {}
  if (currentLang) {
    langFile = languageList[currentLang.id].text
  }

  let returnValue = 0;
  const result = await axios
  .post(
    process.env.REACT_APP_DB_HOST + `/wallets/delete?userId=${userId}&userWalletIndex=${userWalletIndex}`,
    `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "jwtToken":"${JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO_NAME))?.jwtToken}"}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    // .delete(
    //   process.env.REACT_APP_DB_HOST +
    //     `/wallets?userWalletIndex=${userWalletIndex}`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
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
