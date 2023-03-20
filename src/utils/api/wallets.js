import axios from "axios";
import { privateHeaders, handleTokenExpired } from "./base";

export const getWallet = async (userId) => {
  let resultValue = 0;
  await axios.get(`/public/wallets/all?userId=${userId}`).then((data) => {
    resultValue = data.data;
  });

  return resultValue;
};

export const addWallet = async (walletType, walletAddress) => {
  let returnValue = 0;
  await axios
    .post(
      "/wallets/new",
      {
        wallet_type: walletType,
        wallet_address: walletAddress,
      },
      {
        headers: privateHeaders,
      }
    )
    .then((data) => {
      returnValue = data.data;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};

export const deleteWallet = async (userWalletIndex) => {
  let returnValue = 0;
  await axios
    .delete(`/wallets?userWalletIndex=${userWalletIndex}`, {
      headers: privateHeaders,
    })
    .then((data) => {
      returnValue = data.data;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};
