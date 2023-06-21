import { EmptyWallet, MetamaskIcon } from "assets/icons";
import { ContainedButton } from "components/button";
import { EditableCard, EmptyCard } from "components/card";
import { ConfirmModal, DeleteModal } from "components/modal";
import AddWalletAddress from "components/modal/AddWalletAddress";
import { minABI } from "data/minABI";
import Chainlist from "pages/SendTokenStepsPage/data/SimpleTokenList";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getTrxsLinkInfo, receiveTrxs, toggleIsValid } from "utils/api/trxs";
import { postTweet } from "utils/api/twitter";
import { addWallet, deleteWallet } from "utils/api/wallets";
import { receiveTrxHashState } from "utils/atoms/trxs";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

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

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x = Math.imul(x, Math.pow(10, e - 1));
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
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
  failed,
  resend,
  select,
  setSelect,
}) => {
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(-1);
  const [addedWallet, setAddedWallet] = useState();
  const [transactionHash, setTransactionHash] = useState(null);
  const [checkStatus, setCheckStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const setReceiveTrxHash = useSetRecoilState(receiveTrxHashState);
  const { t } = useTranslation();

  const Web3 = require("web3");
  let web3 = "";
  if (Number(linkInfo.networkId) == 137) {
    web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_POLYGON_URL)
    );
  } else {
    web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_GO_URL)
    );
  }

  useEffect(() => {
    if (resend) {
      getTokenOnClick();
    }
  }, []);

  useEffect(() => {
    if (realDelete) {
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
          await addWallet("METAMASK", addedWallet).then(() => {
            var tmpWalletList = walletList;
            tmpWalletList.push({
              walletAddress: addedWallet,
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

  function isMobileDevice() {
    return (
      ("ontouchstart" in window || "onmsgesturechange" in window) &&
      !window.ethereum
    );
  }

  const walletConnectOnClick = async () => {
    if (!window.ethereum && !isMobileDevice()) {
      setShowModal(true);
    } else {
      setModalVisible(true);
    }
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelect(value);
  };

  const getTokenOnClick = async () => {
    await getTrxsLinkInfo(linkInfo.linkKey).then(async (infoRes) => {
      if (infoRes.isValid) {
        if (resend) {
          setLoading(true);
        }
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
          const tempContract = new web3.eth.Contract(minABI, tokenInfo.address);

          async function sendToken() {
            setLoading(true);
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
            return data;
          }

          sendToken().then(async (data) => {
            const getGasAmount = async (fromAddress, toAddress) => {
              const gasAmount = await web3.eth.estimateGas({
                to: toAddress,
                from: fromAddress,
                data: data,
              });
              return gasAmount;
            };

            const gasAmount = await getGasAmount(
              account.address,
              tokenInfo.address,
              toFixed(Number(linkInfo.tokenAmount))
            );

            const fee = gasAmount;

            const txObj = {
              data: data,
              value: 0,
              gas: fee,
              to: tokenInfo.address,
            };

            await web3.eth.accounts.signTransaction(
              txObj,
              process.env.REACT_APP_WALLET_PRIVATE_KEY,
              async (err, signedTx) => {
                if (err) {
                  console.log(err);
                  setFailed(true);
                  return err;
                } else {
                  setReceiveTrxHash(signedTx.transactionHash);
                  setTransactionHash(signedTx.transactionHash); // asnyc 문제 때문에

                  return await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                    async (err, res) => {
                      if (err) {
                        console.log(err);
                        if (
                          String(err).startsWith(
                            "Error: Returned error: already known"
                          ) ||
                          String(err).startsWith(
                            "Error: Returned error: replacement transaction underpriced"
                          ) ||
                          String(err).startsWith(
                            "Error: Returned error: insufficient funds"
                          )
                        ) {
                          setLoading(false);
                          setFailed(true);
                        }
                      } else {
                        setTransactionHash(res); // 저장해야할 hash값
                        console.log(signedTx.transactionHash);

                        if (res || resend) {
                          const interval = setInterval(() => {
                            web3.eth
                              .getTransactionReceipt(signedTx.transactionHash)
                              .then(async (receipt) => {
                                if (!receipt && !failed) {
                                  console.log("pending");
                                  setLoading(true);
                                } else {
                                  clearInterval(interval);
                                  let tmpReceiveInfo = linkInfo;
                                  tmpReceiveInfo.receiverWalletAddress =
                                    walletList[select].walletAddress;
                                  tmpReceiveInfo.transactionHash = res;
                                  toggleIsValid(linkInfo.id, false, "TWITTER");
                                  await receiveTrxs(
                                    walletList[select].walletAddress,
                                    "METAMASK",
                                    0.000001,
                                    "TWITTER",
                                    linkInfo.id
                                  ).then(async (data) => {
                                    setReceiveInfo(data);
                                    setLoading(false);
                                    setComplete(true);
                                    requestPostTweet();
                                  });
                                  setCheckStatus(!checkStatus);
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
                      }
                    }
                  );
                }
              }
            );
          });
        } else {
          const getGasAmount = async (fromAddress, toAddress, amount) => {
            const gasAmount = await web3.eth.estimateGas({
              to: toAddress,
              from: fromAddress,
              value: web3.utils.toWei(`${amount}`, "ether"),
            });
            return gasAmount;
          };

          const gasAmount = await getGasAmount(
            account.address,
            walletList[select].walletAddress,
            toFixed(Number(linkInfo.tokenAmount))
          );
          const fee = gasAmount;
          const txObj = {
            value: web3.utils.toHex(
              toFixed(Number(linkInfo.tokenAmount) * Math.pow(10, 18))
            ),
            gas: fee,
            to: walletList[select].walletAddress,
            from: account.address,
          };

          await web3.eth.accounts.signTransaction(
            txObj,
            process.env.REACT_APP_WALLET_PRIVATE_KEY,
            async (err, signedTx) => {
              if (err) {
                console.log(err);
                setFailed(true);
                return err;
              } else {
                setReceiveTrxHash(signedTx.transactionHash);
                setTransactionHash(signedTx.transactionHash); // asnyc 문제 때문에

                return await web3.eth.sendSignedTransaction(
                  signedTx.rawTransaction,
                  async (err, res) => {
                    if (err) {
                      if (
                        String(err).startsWith(
                          "Error: Returned error: already known"
                        ) ||
                        String(err).startsWith(
                          "Error: Returned error: replacement transaction underpriced"
                        ) ||
                        String(err).startsWith(
                          "Error: Returned error: insufficient funds"
                        )
                      ) {
                        setLoading(false);
                        setFailed(true);
                      }
                    } else {
                      setTransactionHash(res); // 저장해야할 hash값
                      setReceiveTrxHash(signedTx.transactionHash);
                      console.log(signedTx.transactionHash);

                      if (res || resend) {
                        const interval = setInterval(() => {
                          web3.eth
                            .getTransactionReceipt(signedTx.transactionHash)
                            .then(async (receipt) => {
                              if (!receipt && !failed) {
                                console.log("pending");
                                setLoading(true);
                              } else {
                                clearInterval(interval);
                                let tmpReceiveInfo = linkInfo;
                                tmpReceiveInfo.receiverWalletAddress =
                                  walletList[select].walletAddress;
                                tmpReceiveInfo.transactionHash = res;
                                toggleIsValid(linkInfo.id, false, "TWITTER");
                                await receiveTrxs(
                                  walletList[select].walletAddress,
                                  "METAMASK",
                                  0.000001,
                                  "TWITTER",
                                  linkInfo.id
                                ).then((data) => {
                                  setReceiveInfo(data);
                                  setLoading(false);
                                  setComplete(true);
                                  requestPostTweet();
                                });
                                setCheckStatus(!checkStatus);
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
  };

  const convertDateFormatTwitter = (date) => {
    const dateArr = date.substring(4, 33).split(" ");
    let monthNamesEn = {
      Jan: "January",
      Feb: "February",
      Mar: "March",
      Apr: "April",
      May: "May",
      Jun: "June",
      Jul: "July",
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December",
    };

    let monthNamesKo = {
      Jan: "1",
      Feb: "2",
      Mar: "3",
      Apr: "4",
      May: "5",
      Jun: "6",
      Jul: "7",
      Aug: "8",
      Sep: "9",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    if (localStorage.getItem("language") === "en") {
      return (
        dateArr[3].substring(0, 5) +
        " on " +
        monthNamesEn[date[0]] +
        " " +
        dateArr[1] +
        ", " +
        dateArr[2] +
        " (" +
        dateArr[4].substring(0, 6) +
        ":" +
        dateArr[4].substring(6, 8) +
        ")" +
        "\n"
      );
    } else {
      return (
        dateArr[2] +
        "년 " +
        monthNamesKo[dateArr[0]] +
        "월 " +
        dateArr[1] +
        "일 " +
        dateArr[3].substring(0, 5) +
        " (" +
        dateArr[4].substring(0, 6) +
        ":" +
        dateArr[4].substring(6, 8) +
        ")" +
        "\n"
      );
    }
  };

  const pathname = window.location.pathname.split("/");
  const linkKey = pathname[pathname.length - 1];
  const requestPostTweet = async () => {
    const date = new Date().toString();
    const dateInFormat = convertDateFormatTwitter(date);

    await postTweet(linkKey, dateInFormat).then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      {showModal && (
        <ConfirmModal
          visible={setShowModal}
          onClose={() => setShowModal(false)}
          text={<>{t("addWalletModalAlert")}</>}
          buttonText={<>{t("addWalletModalAlertButton")}</>}
          subActionOnClick={() => {
            window.open(
              "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko"
            );
          }}
        />
      )}
      {modalVisible && (
        <AddWalletAddress
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          setAddedWallet={setAddedWallet}
        />
      )}
      {!resend && (
        <FullContainer>
          {deleteModalOn && (
            <DeleteModal
              visible={deleteModalOn}
              closable={true}
              maskClosable={true}
              onClose={closeDeleteModal}
              text={<>{t("manageProfilePageAlertDeleteWallet1")}</>}
              setRealDelete={setRealDelete}
            />
          )}
          <TitleContainer>
            {walletList?.length > 0 && (
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
      )}
    </>
  );
};

export default WalletComponent;
