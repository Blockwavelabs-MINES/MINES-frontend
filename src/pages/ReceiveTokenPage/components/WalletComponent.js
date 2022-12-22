import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { EmptyCard, EditableCard } from "../../../components/card";
import { EmptyWallet, MetamaskIcon } from "../../../assets/icons";
import { DeleteModal } from "../../../components/modal";
import { MetamaskOnClick } from "../../../actions/WalletConnectActions";
import { setLocalUserInfo } from "../../../utils/functions/setLocalVariable";
import { addWallet, deleteWallet } from "../../../utils/api/wallets";
import { receiveTrxs } from "../../../utils/api/trxs";
import Chainlist from "../../SendTokenPage/data/SimpleTokenList";

const FullContainer = styled.div`
  width: 100%;
  padding: 20px;
  padding-bottom: 60px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TItleText = styled.div`
  text-align: left;
  ${Typography.Headline1}
  color: ${palette.Black};
`;

const ListContainer = styled.div`
  width: 100%;
  padding-top: 40px;
  display: grid;
  gap: 20px;
`;

const WalletListBox = styled.div`
  min-height: 283px;
`;

const walletConvert = (walletAddress) => {
  var returnAddress = walletAddress;
  if (walletAddress?.length > 15) {
    returnAddress =
      walletAddress.substr(0, 6) +
      "..." +
      walletAddress.substr(walletAddress.length - 6, walletAddress.length);
  }
  return returnAddress;
};

function isMobileDevice() {
  return (
    ("ontouchstart" in window || "onmsgesturechange" in window) &&
    !window.ethereum
  );
}

const WalletComponent = ({
  userInfoProps,
  setInfoChange,
  infoChange,
  setComplete,
  setReceiveInfo,
  linkInfo,
  setLoading,
}) => {
  const [walletList, setWalletList] = useState(userInfoProps?.wallets);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(-1);
  const [addedWallet, setAddedWallet] = useState();
  const [userInfo, setUserInfo] = useState(userInfoProps);
  const [select, setSelect] = useState(0);

  useEffect(() => {
    setWalletList(userInfoProps?.wallets);
    setUserInfo(userInfoProps);
    console.log(userInfoProps);
  }, [userInfoProps]);

  useEffect(() => {
    (async () => {
      if (realDelete) {
        // 지우는 action
        const deleteWalletResult = await deleteWallet(
          walletList[deleteIdx].index
        ).then((data) => {
          console.log(data);

          setDeleteIdx(-1);
          setRealDelete(false);
          setInfoChange(!infoChange);
        });
      }
    })();
  }, [realDelete]);

  useEffect(() => {
    (async () => {
      if (addedWallet) {
        // 추가하는 action
        const addWalletResult = await addWallet(
          userInfo.user.user_id,
          "METAMASK",
          addedWallet
        ).then((data) => {
          console.log(data);
          var tmpWalletList = walletList;
          tmpWalletList.push({
            // type: "Metamask",
            wallet_address: addedWallet,
            // icon: MetamaskIcon,
          });

          setAddedWallet();
          setInfoChange(!infoChange);
        });
      }
    })();
  }, [addedWallet]);

  const deleteOnClick = (idx) => {
    setDeleteIdx(idx);
    setDeleteModalOn(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOn(false);
  };

  const walletConnectOnClick = () => {
    MetamaskOnClick(walletList, setAddedWallet);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setSelect(value);
  };

  const getTokenOnClick = async () => {
    console.log(linkInfo);
    const chainIndex = Chainlist.findIndex(
      (v) => v.chainId == 5 // 지금은 goerli 밖에 없으니까..
    );
    const chainInfo = Chainlist[chainIndex]?.tokenList;
    const tokenIndex = chainInfo.findIndex(
      (v) => v.symbol == linkInfo.token_udenom
    );
    const tokenInfo = chainInfo[tokenIndex];
    console.log(tokenInfo);
    const Web3 = require("web3");
    const TokenABI = require("../../../utils/abis/IERC20_ABI");
    const web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_GO_URL)
    );

    const account = await web3.eth.accounts.privateKeyToAccount(
      process.env.REACT_APP_WALLET_PRIVATE_KEY
    );
    console.log(account);

    if (tokenInfo.symbol == "USDC" || tokenInfo.symbol == "USDT") {
      let minABI = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
        // decimals
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function",
        },
        //transfer
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        //approve
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const tempContract = new web3.eth.Contract(
        minABI,
        tokenInfo.address
        // tempSigner
      );

      let res = await tempContract.methods.approve(tokenInfo.address, 1000000);

      async function sendToken() {
        setLoading(true);
        console.log("set loading...");
        let data = tempContract.methods
          .transfer(
            walletList[select].wallet_address,
            web3.utils.toHex(
              Number(linkInfo.token_amount) * Math.pow(10, tokenInfo.decimals)
            )
          )
          .encodeABI();
        console.log(data);
        return data;
      }
      //            Number(linkInfo.token_amount) * Math.pow(10, tokenInfo.decimals)

      sendToken().then(async (data) => {
        console.log(data);
        const txObj = {
          data: data,
          value: 0,
          // value: web3.utils.toHex(
          //   Number(linkInfo.token_amount) * 0.001 * Math.pow(10, 18)
          // ),
          // gas: web3.utils.toHex(25000000),
          gas: 4000000,
          to: tokenInfo.address,
          // from: account.address,
        };

        console.log(txObj);
        console.log(process.env.REACT_APP_WALLET_PRIVATE_KEY);

        web3.eth.accounts.signTransaction(
          txObj,
          process.env.REACT_APP_WALLET_PRIVATE_KEY,
          (err, signedTx) => {
            if (err) {
              // return callback(err);
              console.log(err);
              return err;
            } else {
              console.log(signedTx);
              return web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                async (err, res) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(res); // 저장해야할 hash값

                    let tmpReceiveInfo = linkInfo;
                    tmpReceiveInfo.receiver_wallet_address =
                      walletList[select].wallet_address;
                    tmpReceiveInfo.transaction_escrow_hash = res;
                    const receiveTrxsResult = await receiveTrxs(
                      walletList[select].wallet_address,
                      "METAMASK",
                      0.000001,
                      linkInfo.index
                    );
                    setReceiveInfo(linkInfo);
                    setLoading(false);
                    setComplete(true);
                  }
                }
              );
            }
          }
        );
      });
    } else {
      let minABI = TokenABI;

      const txObj = {
        // data: data,
        value: web3.utils.toHex(
          Number(linkInfo.token_amount) * Math.pow(10, 18)
        ),
        gas: web3.utils.toHex(200000),
        to: walletList[select].wallet_address,
        from: account.address,
      };

      console.log(txObj);
      console.log(process.env.REACT_APP_WALLET_PRIVATE_KEY);

      web3.eth.accounts.signTransaction(
        txObj,
        process.env.REACT_APP_WALLET_PRIVATE_KEY,
        (err, signedTx) => {
          if (err) {
            // return callback(err);
            console.log(err);
            return err;
          } else {
            console.log(signedTx);
            return web3.eth.sendSignedTransaction(
              signedTx.rawTransaction,
              async (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(res); // 저장해야할 hash값

                  let tmpReceiveInfo = linkInfo;
                  tmpReceiveInfo.receiver_wallet_address =
                    walletList[select].wallet_address;
                  tmpReceiveInfo.transaction_escrow_hash = res;
                  const receiveTrxsResult = await receiveTrxs(
                    walletList[select].wallet_address,
                    "METAMASK",
                    0.000001,
                    linkInfo.index
                  );
                  setReceiveInfo(linkInfo);
                  setComplete(true);
                }
              }
            );
          }
        }
      );
    }
  };

  return (
    <FullContainer>
      {deleteModalOn ? (
        <DeleteModal
          visible={deleteModalOn}
          closable={true}
          maskClosable={true}
          onClose={closeDeleteModal}
          text={<>이 지갑을 정말 삭제하시겠어요?</>}
          setRealDelete={setRealDelete}
        />
      ) : (
        <></>
      )}
      <TitleContainer>
        <TItleText>지갑</TItleText>
        {walletList?.length > 0 ? (
          <>
            {isMobileDevice() ? (
              <a href="https://metamask.app.link/dapp/3tree.io">
                <ContainedButton
                  type="secondary"
                  styles="filled"
                  states="default"
                  size="small"
                  label="지갑 추가"
                  onClick={walletConnectOnClick}
                />
              </a>
            ) : (
              <ContainedButton
                type="secondary"
                styles="filled"
                states="default"
                size="small"
                label="지갑 추가"
                onClick={walletConnectOnClick}
              />
            )}
          </>
        ) : (
          <></>
        )}
      </TitleContainer>
      {walletList?.length == 0 ? (
        <>
          <EmptyCard icon={EmptyWallet} text="지갑이" />
          <>
            {isMobileDevice() ? (
              <a href="https://metamask.app.link/dapp/3tree.io">
                <ContainedButton
                  type="primary"
                  styles="filled"
                  states="default"
                  size="large"
                  label="지갑 추가하기"
                  onClick={walletConnectOnClick}
                />
              </a>
            ) : (
              <ContainedButton
                type="primary"
                styles="filled"
                states="default"
                size="large"
                label="지갑 추가하기"
                onClick={walletConnectOnClick}
              />
            )}
          </>
        </>
      ) : (
        <>
          <WalletListBox>
            <ListContainer>
              {walletList?.map((wallet, idx) => (
                <EditableCard
                  label={walletConvert(wallet.wallet_address)}
                  isEdit={false}
                  isTrash={false}
                  isCheck={true}
                  select={select}
                  idx={idx}
                  // icon={wallet.icon}
                  icon={MetamaskIcon}
                  deleteOnClick={() => deleteOnClick(idx)}
                  checkOnClick={handleSelectChange}
                ></EditableCard>
              ))}
            </ListContainer>
          </WalletListBox>
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label="토큰 받기"
            onClick={getTokenOnClick}
          />
        </>
      )}
    </FullContainer>
  );
};

export default WalletComponent;
