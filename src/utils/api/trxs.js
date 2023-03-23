import axios from "axios";
import { handleTokenExpired, privateHeaders } from "./base";

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
      },
      {
        headers: privateHeaders,
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data;
    });

  return returnValue;
};

export const getTrxsLinkInfo = async (linkKey) => {
  let returnValue = 0;
  await axios
    .get(`public/trxs?link_key=${linkKey}`)
    .then((data) => {
      returnValue = data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};
