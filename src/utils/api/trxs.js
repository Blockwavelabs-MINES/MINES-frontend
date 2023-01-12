import axios from "axios";

export const sendTrxs = async (
  senderUserIndex,
  senderWalletAddress,
  senderTokenWalletType,
  receiverSocialPlatform,
  receiverSocialId,
  tokenUdenom,
  tokenAmount,
  transactionEscrowHash,
  transactionEscrowId,
  expiredAt,
  senderUserId,
  tokenContractAddress,
  networkId
) => {
  let returnValue = 0;
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST + `/trxs/send`,
      `{"frontKey":"${
        process.env.REACT_APP_3TREE_API_KEY
      }","senderUserIndex":${Number(
        senderUserIndex
      )},"senderWalletAddress":"${senderWalletAddress}","senderTokenWalletType":"${senderTokenWalletType}","receiverSocialPlatform":"${receiverSocialPlatform}","receiverSocialId":"${receiverSocialId}","tokenUdenom":"${tokenUdenom}","tokenAmount":${Number(
        tokenAmount
      )},"transactionEscrowHash":"${transactionEscrowHash}","transactionEscrowId":"${transactionEscrowId}","expiredAt":"${expiredAt}","senderUserId":"${senderUserId}","tokenContractAddress":"${tokenContractAddress}","networkId":"${networkId}"}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
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
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST +
        `/trxs/send/receive?trxIndex=${linkIndex}`,
      `{"frontKey":"${
        process.env.REACT_APP_3TREE_API_KEY
      }","receiverWalletAddress":"${receiverWalletAddress}","receiveTokenWalletType":"${receiveTokenWalletType}","transactionGasFee":${Number(
        transactionGasFee
      )}}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
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
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST + `/trxs?linkKey=${linkKey}`,
      `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}"}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    // .get(process.env.REACT_APP_DB_HOST + `/trxs?linkKey=${linkKey}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};
