import axios from "axios";

// 토큰 수령 링크 생성 API
export const generateReceiveLink = async (
  senderSocialName,
  senderSocialType,
  senderWalletAddress,
  senderWalletType,
  receiverSocialName,
  receiverSocialType,
  tokenTicker,
  tokenAmount,
  transactionHash,
  networkId
) => {
  let returnValue = 0;
  await axios
    .post(
      `/send`,
      {
        senderSocialName: senderSocialName,
        senderSocialType: senderSocialType,
        senderWalletAddress: senderWalletAddress,
        senderWalletType: senderWalletType,
        receiverSocialName: receiverSocialName,
        receiverSocialType: receiverSocialType,
        tokenTicker: tokenTicker,
        tokenAmount: tokenAmount,
        transactionHash: transactionHash,
        tokenContractAddress: "asdasdasd",
        networkId: networkId
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    .then((res) => {
      returnValue = res.data.data;
    });

  return returnValue;
};

// 토큰 수령 정보 업데이트
export const receiveTrxs = async (
  transactionId,
  receiverWalletAddress,
  receiverWalletType
) => {
  let returnValue = 0;
  await axios.put(`/send/${transactionId}`,
    {
      receiverWalletAddress: receiverWalletAddress,
      receiverWalletType: receiverWalletType,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  )
    .then((res) => {
      console.log(res.data);
      returnValue = res.data.resultData;
    });

  return returnValue;
};

// 송신 정보 확인
export const getTrxsLinkInfo = async (linkKey) => {
  let returnValue = 0;
  await axios
    .get(`/public/send?link_key=${linkKey}`)
    .then((res) => {
      returnValue = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

export const toggleIsValid = async (
  sendTrxIndex,
  isValid,
  socialPlatformType
) => {
  let returnValue;
  await axios
    .patch(
      `/trxs/toggle/valid`,
      {
        sendTrxIndex: sendTrxIndex,
        isValid: isValid,
        socialPlatformType: socialPlatformType,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    .then((data) => {
      returnValue = data.data.resultData;
    });

  return returnValue;
};
