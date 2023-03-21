import axios from "axios";
import { privateHeaders } from "./base";

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
        headers: privateHeaders,
      }
    )
    .then((data) => {
      returnValue = data.data;
    });

  return returnValue;
};

export const receiveTrxs = async (
  receiverWalletAddress,
  receiveTokenWalletType,
  transactionGasFee,
  linkIndex
) => {
  let returnValue = 0;
  await axios
    .post(
      `/trxs/send/receive?trxIndex=${linkIndex}`,
      {
        receiverWalletAddress: receiverWalletAddress,
        receiveTokenWaleltType: receiveTokenWalletType,
        transactionGasFee: transactionGasFee,
      },
      {
        headers: privateHeaders,
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
    });

  return returnValue;
};

export const getTrxsLinkInfo = async (linkKey) => {
  let returnValue = 0;
  await axios
    .get(`/trxs?linkKey=${linkKey}`)
    .then(
      (data) => {
        console.log(data.data);
        returnValue = data.data.result;
      },
      {
        headers: privateHeaders,
      }
    )
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};
