import axios from "axios";

export const addWallet = async (
  userId,
  walletType,
  walletAddress
) => {
  let returnValue = 0;
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST + `/wallets/new?userId=${userId}`,
      `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "walletType":"${walletType}", "walletAddress":"${walletAddress}"}`,
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

export const deleteWallet = async (userWalletIndex) => {
  let returnValue = 0;
  const result = await axios
    .delete(
      process.env.REACT_APP_DB_HOST +
        `/wallets?userWalletIndex=${userWalletIndex}`,
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
