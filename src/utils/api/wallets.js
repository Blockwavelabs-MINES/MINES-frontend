import axios from "axios";
import { handleTokenExpired, privateHeaders } from "./base";

// 지갑 전체 조회
export const getWallet = async (userId) => {
  let resultValue = 0;
  await axios.get(`/public/wallet?user_id=${userId}`)
    .then((res) => {
      resultValue = res.data.data;
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

// 지갑 삭제
export const deleteWallet = async (walletId) => {
  let returnValue = 0;

  await axios.delete(`/wallet/${walletId}`, {
      headers: privateHeaders,
    })
  .then((res) => {
    returnValue = res.data;
  })
  .catch((error) => {
    handleTokenExpired(error);
  });

  return returnValue;
};
