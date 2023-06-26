import axios from "axios";

export const sendTrxs = async (
  senderWalletAddress,
  senderTokenWalletType,
  receiverSocialPlatform,
  receiverSocialId,
  tokenUdenom,
  tokenAmount,
  transactionHash,
  transactionEscrowId,
  expiredAt,
  tokenContractAddress,
  networkId
) => {
  let returnValue = 0;
  await axios
    .post(
      `/trxs/send`,
      {
        senderWalletAddress: senderWalletAddress,
        senderTokenWalletType: senderTokenWalletType.toUpperCase(),
        receiverSocialPlatform: receiverSocialPlatform.toUpperCase(),
        receiverSocialId: receiverSocialId,
        tokenUdenom: tokenUdenom,
        tokenAmount: tokenAmount,
        transactionHash: transactionHash,
        transactionEscrowId: transactionEscrowId,
        expiredAt: expiredAt,
        tokenContractAddress: tokenContractAddress,
        networkId: networkId,
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

export const receiveTrxs = async (
  receiverWalletAddress,
  receiveTokenWalletType,
  transactionGasFee,
  receiverSocialPlatformType,
  trxIndex
) => {
  let returnValue = 0;
  await axios
    .post(
      `/trxs/send/receive?trx_index=${trxIndex}`,
      {
        receiverWalletAddress: receiverWalletAddress,
        receiveTokenWaleltType: receiveTokenWalletType,
        transactionGasFee: transactionGasFee,
        receiverSocialPlatformType: receiverSocialPlatformType,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.resultData;
    });

  return returnValue;
};

export const getTrxsLinkInfo = async (linkKey) => {
  let returnValue = 0;
  await axios
    .get(`public/trxs?link_key=${linkKey}`)
    .then((data) => {
      returnValue = data.data.resultData;
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
