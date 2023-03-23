import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { EmptyCard, EditableCard } from "../../../components/card";
import { EmptyWallet, MetamaskIcon } from "../../../assets/icons";
import { DeleteModal } from "../../../components/modal";
import { addWallet, deleteWallet } from "../../../utils/api/wallets";
import { receiveTrxs, getTrxsLinkInfo } from "../../../utils/api/trxs";
import Chainlist from "../../SendTokenPage/data/SimpleTokenList";
import { useTranslation } from "react-i18next";
import AddWalletAddress from "../../../components/modal/AddWalletAddress";

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

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      // console.log(e)
      // console.log(x*1000000)
      // x *= Math.pow(10, e - 1);
      x = Math.imul(x, Math.pow(10, e - 1));
      // console.log(Math.pow(10, e - 1))
      console.log(x);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
      console.log(x);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}

const WalletComponent = ({
  walletList,
  setInfoChange,
  infoChange,
  setComplete,
  setReceiveInfo,
  linkInfo,
  setLoading,
  setFailed,
  setSendOnClick,
  resend,
  select,
  setSelect,
}) => {
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(-1);
  const [addedWallet, setAddedWallet] = useState();
  const [transactionHash, setTransactionHash] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [checkStatus, setCheckStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const Web3 = require("web3");
  const TokenABI = require("../../../utils/abis/IERC20_ABI");
  let web3 = "";
  console.log(Number(linkInfo.networkId));
  if (Number(linkInfo.networkId) == 137) {
    web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_POLYGON_URL)
    );
  } else {
    // linkInfo.network_id == 5
    web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_GO_URL)
    );
  }

  useEffect(() => {
    console.log(resend);
    if (resend) {
      getTokenOnClick();
      // setLoading(true);
    }
  }, []);

  useEffect(() => {
    // setSendOnClick(getTokenOnClick);
  }, []);

  useEffect(() => {
    if (transactionHash) {
      console.log("holololololo");
    }
  }, [checkStatus]);

  useEffect(() => {
    if (transactionHash) {
      // Check the status of the transaction every 1 second
      const interval = setInterval(() => {
        web3.eth
          .getTransactionReceipt(
            transactionHash
            // "dfsdfdfd"
          )
          .then((receipt) => {
            if (receipt == null) {
              console.log("pending");
              setTransactionStatus("pending");
              setLoading(true);
            } else {
              setTransactionStatus("mined");
              setLoading(false);
              setComplete(true);
              clearInterval(interval);
            }
          })
          .catch((err) => {
            // 존재하지 않는 hash 값일 경우 (+ pending이 길게 되어 tx가 사라진 경우)
            console.log(err);
            setLoading(false);
            setFailed(true);
            clearInterval(interval);
          });
      }, 1000);
    }
  }, [transactionHash, checkStatus]);

  useEffect(() => {
    console.log("realDelete is false");
    if (realDelete) {
      // 지우는 action
      console.log(walletList);
      console.log(walletList[deleteIdx]);
      deleteWallet(walletList[deleteIdx].index).then(() => {
        setDeleteIdx(-1);
        setRealDelete(false);
        setInfoChange(!infoChange);
      });
    }
  }, [realDelete]);

  useEffect(() => {
    (async () => {
      if (addedWallet) {
        //중복 검사
        let notDuplicated = true;
        walletList.forEach((wallet) => {
          if (wallet.walletAddress == addedWallet) {
            notDuplicated = false;
          }
        });
        if (notDuplicated) {
          // 추가하는 action
          await addWallet("METAMASK", addedWallet).then((data) => {
            console.log(data);
            var tmpWalletList = walletList;
            tmpWalletList.push({
              // type: "Metamask",
              walletAddress: addedWallet,
              // icon: MetamaskIcon,
            });

            setAddedWallet();
            setInfoChange(!infoChange);
          });
        }
      }
    })();
  }, [addedWallet]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteOnClick = (idx) => {
    setDeleteIdx(idx);
    setDeleteModalOn(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOn(false);
  };

  const walletConnectOnClick = () => {
    // MetamaskOnClick(walletList, setAddedWallet);
    setModalVisible(true);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setSelect(value);
  };

  const getTokenOnClick = async () => {
    await getTrxsLinkInfo(linkInfo.linkKey).then(async (infoRes) => {
      if (infoRes.isValid) {
        if (resend) {
          setLoading(true);
        }
        console.log(linkInfo);
        const chainIndex = Chainlist.findIndex(
          (v) => v.chainId == Number(linkInfo.networkId) // 지금은 goerli 밖에 없으니까..
        );
        const chainInfo = Chainlist[chainIndex]?.tokenList;
        const tokenIndex = chainInfo.findIndex(
          (v) => v.symbol == linkInfo.tokenUdenom
        );
        const tokenInfo = chainInfo[tokenIndex];

        const account = await web3.eth.accounts.privateKeyToAccount(
          process.env.REACT_APP_WALLET_PRIVATE_KEY
        );

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

          let res = await tempContract.methods.approve(
            tokenInfo.address,
            1000000
          );

          async function sendToken() {
            console.log(Number(linkInfo.tokenAmount));
            setLoading(true);
            console.log("set loading...");
            let data = tempContract.methods
              .transfer(
                walletList[select].walletAddress,
                web3.utils.toHex(
                  toFixed(
                    Number(linkInfo.tokenAmount) *
                      Math.pow(10, tokenInfo.decimals)
                  )
                )
              )
              .encodeABI();
            console.log(data);
            return data;
          }
          //            Number(linkInfo.token_amount) * Math.pow(10, tokenInfo.decimals)

          sendToken().then(async (data) => {
            console.log(data);
            const getGasAmount = async (fromAddress, toAddress, amount) => {
              const gasAmount = await web3.eth.estimateGas({
                to: toAddress,
                from: fromAddress,
                value: web3.utils.toWei(`${amount}`, "ether"),
              });
              return gasAmount;
            };

            const gasPrice = await web3.eth.getGasPrice();
            console.log(Number(linkInfo.tokenAmount));
            const gasAmount = await getGasAmount(
              account.address,
              tokenInfo.address,
              toFixed(Number(linkInfo.tokenAmount))
              // web3.utils.toHex(Number(linkInfo.token_amount) * Math.pow(10, 18))
            );
            // const fee = Number(gasPrice) + gasAmount;
            const fee = gasAmount;
            // const fee = gasPrice * 32000;
            console.log(fee);

            const txObj = {
              data: data,
              value: 0,
              // value: web3.utils.toHex(
              //   Number(linkInfo.token_amount) * 0.001 * Math.pow(10, 18)
              // ),
              // gas: web3.utils.toHex(25000000),
              // gas: 4000000,
              gas: fee,
              // gas: 21000,
              // gas: 32000,
              to: tokenInfo.address,
              // from: account.address,
            };

            console.log(txObj);

            await web3.eth.accounts.signTransaction(
              txObj,
              process.env.REACT_APP_WALLET_PRIVATE_KEY,
              async (err, signedTx) => {
                if (err) {
                  // return callback(err);
                  console.log(err);
                  return err;
                } else {
                  console.log(signedTx);
                  setTransactionHash(signedTx.transactionHash); // asnyc 문제 때문에

                  return await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                    async (err, res) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(res); // 저장해야할 hash값
                        setTransactionHash(res);

                        let tmpReceiveInfo = linkInfo;
                        tmpReceiveInfo.receiverWalletAddress =
                          walletList[select].walletAddress;
                        tmpReceiveInfo.transactionHash = res;
                        await receiveTrxs(
                          walletList[select].walletAddress,
                          "METAMASK",
                          0.000001,
                          linkInfo.id
                        );
                        setLoading(true);
                        setCheckStatus(!checkStatus);
                        console.log("here");
                      }
                    }
                  );
                }
              }
            );
          });
        } else {
          let minABI = TokenABI;

          const getGasAmount = async (fromAddress, toAddress, amount) => {
            const gasAmount = await web3.eth.estimateGas({
              to: toAddress,
              from: fromAddress,
              value: web3.utils.toWei(`${amount}`, "ether"),
            });
            return gasAmount;
          };

          console.log(walletList);
          console.log(walletList[select]);
          console.log(walletList[select].walletAddress);

          const gasPrice = await web3.eth.getGasPrice();
          console.log(Number(linkInfo.tokenAmount));
          console.log(toFixed(Number(linkInfo.tokenAmount)));
          const gasAmount = await getGasAmount(
            account.address,
            walletList[select].walletAddress,
            toFixed(Number(linkInfo.tokenAmount))
            // web3.utils.toHex(Number(linkInfo.token_amount) * Math.pow(10, 18))
          );
          // const fee = Number(gasPrice) + gasAmount;
          const fee = gasAmount;
          console.log(fee);
          console.log(gasPrice);
          console.log(gasAmount);
          // const fee = gasPrice * 32000;

          console.log(Number(linkInfo.tokenAmount));
          const txObj = {
            // data: data,
            value: web3.utils.toHex(
              toFixed(Number(linkInfo.tokenAmount) * Math.pow(10, 18))
            ),
            // gas: web3.utils.toHex(25000000),
            gas: fee,
            // gas: 21000,
            // gas: 32000,
            to: walletList[select].walletAddress,
            from: account.address,
          };

          console.log(txObj);
          await web3.eth.accounts.signTransaction(
            txObj,
            process.env.REACT_APP_WALLET_PRIVATE_KEY,
            async (err, signedTx) => {
              if (err) {
                // return callback(err);
                console.log(err);
                return err;
              } else {
                console.log(signedTx);
                console.log(signedTx.transactionHash);
                setTransactionHash(signedTx.transactionHash); // asnyc 문제 때문에

                return await web3.eth.sendSignedTransaction(
                  signedTx.rawTransaction,
                  async (err, res) => {
                    if (err) {
                      console.log(walletList[select].walletAddress);
                      console.log(String(err));
                      if (
                        String(err).startsWith(
                          "Error: Returned error: already known"
                        ) ||
                        String(err).startsWith(
                          "Error: Returned error: replacement transaction underpriced"
                        )
                      ) {
                        setLoading(false);
                        setFailed(true);
                      }
                    } else {
                      console.log(res); // 저장해야할 hash값
                      setTransactionHash(res);

                      let tmpReceiveInfo = linkInfo;
                      tmpReceiveInfo.receiverWalletAddress =
                        walletList[select].walletAddress;
                      tmpReceiveInfo.transactionHash = res;
                      await receiveTrxs(
                        walletList[select].walletAddress,
                        "METAMASK",
                        0.000001,
                        linkInfo.id
                      ).then((data) => {
                        setReceiveInfo(data);
                      });

                      // setReceiveInfo(tmpReceiveInfo);
                      setLoading(true);
                      setCheckStatus(!checkStatus);
                      console.log("here");
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        alert(t("receiveTokenAlreadyReceived1"));
        window.location.href = "/";
      }
    });

    console.log("done");
  };

  // setSendOnClick(getTokenOnClick);

  return (
    <>
      {modalVisible ? (
        <AddWalletAddress
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          setAddedWallet={setAddedWallet}
        />
      ) : (
        <></>
      )}
      {!resend ? (
        <FullContainer>
          {deleteModalOn ? (
            <DeleteModal
              visible={deleteModalOn}
              closable={true}
              maskClosable={true}
              onClose={closeDeleteModal}
              text={<>{t("manageProfilePageAlertDeleteWallet1")}</>}
              setRealDelete={setRealDelete}
            />
          ) : (
            <></>
          )}
          <TitleContainer>
            {walletList?.length > 0 ? (
              <>
                <TItleText>{t("manageProfilePage3")}</TItleText>
                <ContainedButton
                  type="secondary"
                  styles="filled"
                  states="default"
                  size="small"
                  label={t("manageProfilePage4")}
                  onClick={walletConnectOnClick}
                />
              </>
            ) : (
              <></>
            )}
          </TitleContainer>
          {walletList?.length == 0 ? (
            <>
              <EmptyCard icon={EmptyWallet} text={t("selectWalletPage3_3")} />
              <ContainedButton
                type="primary"
                styles="filled"
                states="default"
                size="large"
                label={t("selectWalletPage5")}
                onClick={walletConnectOnClick}
              />
            </>
          ) : (
            <>
              <WalletListBox>
                <ListContainer>
                  {walletList?.map((wallet, idx) => (
                    <EditableCard
                      key={wallet.index}
                      label={walletConvert(wallet.walletAddress)}
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
                label={t("selectWalletPage8")}
                onClick={getTokenOnClick}
              />
            </>
          )}
        </FullContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default WalletComponent;
