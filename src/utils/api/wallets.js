import axios from "axios";
import { handleTokenExpired, privateHeaders } from "./base";

// 보류
export const getWallet = async (userId) => {
  let resultValue = 0;
  await axios.get(`/public/wallets/all?userId=${userId}`).then((data) => {
    resultValue = data.data.resultData;
  });

  return resultValue;
};

// 지갑 추가
export const addWallet = async (walletType, walletAddress) => {
  let returnValue = 0;

  await axios.post("/wallet",
    {
      walletAddress: walletAddress,
      walletType: walletType,
    },
    {
      headers: privateHeaders,
    }
  )
  .then((res) => {
    returnValue = res.data;
  })
  .catch((error) => {
    handleTokenExpired(error);
  });

  return returnValue;
};

export const deleteWallet = async (userWalletIndex) => {
  let returnValue = 0;
  await axios
    .delete(`/wallets?user_wallet_index=${userWalletIndex}`, {
      headers: privateHeaders,
    })
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};
