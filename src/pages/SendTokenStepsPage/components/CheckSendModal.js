import { useWeb3React } from "@web3-react/core";
import { ContainedButton } from "components/button";
import { BottomModal } from "components/modal";
import { minABI } from "data/minABI";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { generateReceiveLink } from "utils/api/trxs";
import { twitterIdState } from "utils/atoms/twitter";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import { TextAreaBox } from "components/input";
import ImageBanner from "components/banner/ImageBanner";
import { TwitterImage } from "assets/images";
import { postTweet } from "utils/api/twitter";
import setConvertedData from "utils/functions/setConvertedData";
import getFormattedDate from "utils/functions/getFormattedDate";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 903;
`;

const IntroTextBox = styled.div`
  width: 100%;
  margin: 0px auto;
  padding-top: 100px;
`;

const FirstIntro = styled.div`
  font-family: Montserrat;
  font-size: 23px;
  font-weight: 600;
  text-align: left;
  color: ${palette.Black};
  line-height: 33.35px;
  padding-left: 16px;
`;

const SendAmountInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SendAmountBox = styled.div`
  font-family: Montserrat;
  font-size: 28px;
  font-weight: 600;
  margin-right: 8px;
  text-align: left;
`;

const MainInfoBox = styled.div`
  padding: 22px 20px;
  height: 60%;
`;

const PersonInfoBox = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
`;

const PersonInfoLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: center;
`;

const PersonCategory = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
`;

const PersonInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PersonId = styled.div`
  ${Typography.Headline3}
`;

const PersonIcon = styled.img`
  width: 20px;
  height: 20px;
`;

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

function setExpiredDate() {
  var today = new Date();
  today.setDate(today.getDate() + 3);
  today.setHours(today.getHours() + 9);
  return today.toISOString().substring(0, 19);
}

const LoginModalInner = (
  amount,
  currency,
  sender,
  platformIcon,
  platform,
  receiver,
  stepStatus,
  setStepStatus,
  onClose,
  networkId,
  userIdx,
  address,
  setExpired,
  setFinalLink,
  tokenInfo,
  setLoading,
  setFailed,
  resend,
  setSendModalStep,
  sendModalStep,
  noteValue,
) => {
  const { t } = useTranslation();
  const [transactionHash, setTransactionHash] = useState();
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [escrowId, setEscrowId] = useState();
  const [expiredDateResult, setExpiredDateResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const twitterId = useRecoilValue(twitterIdState);
  const { library } = useWeb3React();

  const Web3 = require("web3");
  let rpcURL;
  if (networkId == 5) {
    rpcURL = process.env.REACT_APP_GO_URL;
  } else if (networkId == 137) {
    rpcURL = process.env.REACT_APP_POLYGON_URL;
  }

  let metamaskProvider = "";

  if (window?.ethereum?.providers) {
    metamaskProvider = window?.ethereum?.providers.find(
      (provider) => provider.isMetaMask
    );
  } else {
    isMobileDevice()
      ? (metamaskProvider = library.provider)
      : (metamaskProvider = window?.ethereum);
  }
  const web3 = new Web3(metamaskProvider);

  useEffect(() => {
    if (resend) {
      sendOnClick();
    }
  }, []);

  const requestPostTweet = async (
    type,
    comment,
    tokenTicker,
    tokenAmount,
    senderUsername,
    receiverUsername
  ) => {
    const convertedTokenAmount = setConvertedData(tokenAmount);
    const date = getFormattedDate();

    await postTweet(
      type,
      comment,
      tokenTicker,
      convertedTokenAmount,
      date,
      senderUsername,
      receiverUsername
    )
    .then(() => {
      console.log("post tweet complete")
    });
  };

  /* 
  * web3API로 (트랜잭션 hash)를 통해 트랜잭션을 받아옴. (아직 트랜잭션 생성이 완료 안됨(receipt: null)이면 interval)
  * -> 서버에 (트랜잭션에 관한 정보)들을 POST요청하고, response로 링크키(수금하기 위한 url키)를 받아옴
  * -> interval 종료. 다음 단계로
  */
  const getReceiptWithTrxsHash = () => {
    const interval = setInterval(async () => {
      await fetch(rpcURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getTransactionByHash",
          params: [transactionHash],
        }),
      })
        .then(async (receipt) => {
          setLoading(true);
          if (receipt == null) {
            setTransactionStatus("pending");
          } else {
            setTransactionStatus("mined");
            await generateReceiveLink(
              twitterId,
              platform,
              address,
              "METAMASK",
              receiver,
              "TWITTER",
              currency,
              amount,
              transactionHash,
              networkId
            ).then((data) => {
              setFinalLink(data.linkKey);
              setExpired(setExpiredDate());
              requestPostTweet(
                "SENDER",
                noteValue,
                currency,
                amount,
                twitterId,
                receiver
              )
              setLoading(false);
            });
            
            setStepStatus(stepStatus + 1);
            onClose();

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
    }, 2000);
  };

  const requestSendToMetamask = async (params) => {
    await metamaskProvider
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then(async (txHash) => {
        const escrowHash = txHash;
        setEscrowId("1234"); // 현재는 escrow로 관리하지 않으므로 일단 임의의 값
        setExpiredDateResult(setExpiredDate());
        setTransactionHash(escrowHash);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (transactionHash) {
      getReceiptWithTrxsHash();
    }
  }, [transactionHash]);

  const sendOnClick = async () => {
    document.body.style.overflow = "auto";
    setIsLoading(true);

    try {
      if (currency == "USDC" || currency == "USDT") {
        let tempProvider = metamaskProvider;
  
        isMobileDevice()
          ? (tempProvider = new Web3(new Web3.providers.HttpProvider(rpcURL)))
          : (tempProvider = new ethers.providers.Web3Provider(metamaskProvider));
        
        async function sendToken() {
          if (isMobileDevice()) {
            const contract = new web3.eth.Contract(minABI, tokenInfo.address);
            const transferMethod = await contract.methods.transfer(
              process.env.REACT_APP_3TREE_ADDRESS,
              web3.utils.toHex(Number(amount) * Math.pow(10, tokenInfo.decimals))
            );
            const encodedData = await transferMethod.encodeABI();
            metamaskProvider = library.provider;
            await metamaskProvider
              .request({
                method: "personal_sign",
                params: [encodedData, address],
              })
              .then(async (transaction) => {
                const escrowHash = transaction;
                setEscrowId("1234"); // 현재는 escrow로 관리하지 않으므로 일단 임의의 값
                setExpiredDateResult(setExpiredDate());
                setTransactionHash(escrowHash);
                getReceiptWithTrxsHash();
              })
              .catch((error) => {
                alert(JSON.stringify(error));
              });
            setLoading(true);
          } else {
            const tempSigner = await tempProvider.getSigner();
            let tempContract = new ethers.Contract(
              tokenInfo.address,
              minABI,
              tempSigner
            );
  
            await tempContract.functions
              .transfer(
                process.env.REACT_APP_3TREE_ADDRESS,
                web3.utils.toHex(
                  Number(amount) * Math.pow(10, tokenInfo.decimals)
                )
              )
              .then(async (transaction) => {
                console.log("Transaction hash:", transaction.hash);
                setLoading(true);
                await transaction.wait().then(async (receipt) => {
                  console.log("Transaction receipt:", receipt);
                  if (receipt.status === 1) {
                    await generateReceiveLink(
                      twitterId,
                      platform,
                      address,
                      "METAMASK",
                      receiver,
                      "TWITTER",
                      currency,
                      amount,
                      transaction.hash,
                      networkId
                    ).then((data) => {
                      setFinalLink(data.linkKey);
                      setExpired(data.expiredAt);
                      requestPostTweet(
                        "SENDER",
                        noteValue,
                        currency,
                        amount,
                        twitterId,
                        receiver
                      )
                      setLoading(false);
                    });
                    setStepStatus(stepStatus + 1);
                    onClose();
                  } else if (receipt.status !== undefined) {
                    setLoading(false);
                    setFailed(true);
                  }
                });
              });
          }
        }
  
        sendToken();
      } else {
        // 보내고 tx값 받은 다음 백호출
        let metamaskProvider = "";
        if (window?.ethereum?.providers) {
          metamaskProvider = window?.ethereum?.providers.find(
            (provider) => provider.isMetaMask
          );
        } else {
          if (isMobileDevice()) {
            metamaskProvider = library.provider;
  
            requestSendToMetamask({
              // nonce: `0x${nonce.toString(16)}`, // ignored by MetaMask
              to: process.env.REACT_APP_3TREE_ADDRESS, // Required except during contract publications.
              from: address, // must match user's active address.
              gas: 60000,
              value: (Math.pow(10, 18) * amount).toString(16), // Only required to send ether to the recipient from the initiating external account.
              data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
              chainId: networkId.toString(16), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            });
          } else {
            metamaskProvider = window?.ethereum;
          }
        }
  
        if (!isMobileDevice()) {
          const Web3 = require("web3");
          const web3 = new Web3(metamaskProvider);
  
          const getGasAmount = async (fromAddress, toAddress, amount) => {
            const gasAmount = await web3.eth.estimateGas({
              to: toAddress,
              from: fromAddress,
              value: web3.utils.toWei(`${amount}`, "ether"),
            });
            return gasAmount;
          };
  
          const gasPrice = await web3.eth.getGasPrice();
          const gasAmount = await getGasAmount(
            address,
            process.env.REACT_APP_3TREE_ADDRESS,
            amount
          );
          const fee = Number(gasPrice) * gasAmount;
  
          requestSendToMetamask({
            nonce: "0x00", // ignored by MetaMask
            to: process.env.REACT_APP_3TREE_ADDRESS, // Required except during contract publications.
            from: address, // must match user's active address.
            maxPriorityFee: String(fee),
            value: (Math.pow(10, 18) * amount).toString(16), // Only required to send ether to the recipient from the initiating external account.
            data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
            chainId: networkId.toString(16), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
          });
        }
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      //setIsLoading(false);
    }
  };

  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>{t("sendConfirmModal1")}</FirstIntro>
      </IntroTextBox>
      <hr style={{ background: `${palette.grey_7}`, height: '1px', border: '0' }} />
      <MainInfoBox>
        <SendAmountInfo>
          <SendAmountBox>
            <font size={4} color={palette.grey_1}>
              {t("sendConfirmModal2")}
            </font>
            {amount} {currency}{" "}
            <font size={4} color={palette.grey_1}>
              {t("sendConfirmModal3")}
            </font>
          </SendAmountBox>
        </SendAmountInfo>
        <PersonInfoBox>
          <PersonInfoLine>
            <PersonCategory>{t("sendConfirmModal4")}</PersonCategory>
            <PersonInfo>
              <PersonId>@{receiver}</PersonId>
              <PersonIcon src={platformIcon} />
            </PersonInfo>
          </PersonInfoLine>
          <PersonInfoLine>
            <PersonCategory>{t("sendConfirmModal5")}</PersonCategory>
            <PersonInfo>
              <PersonId>@{twitterId}</PersonId>
              <PersonIcon src={platformIcon} />
            </PersonInfo>
          </PersonInfoLine>
        </PersonInfoBox>
        <div style={{ marginBottom: "20px" }}>
          <TextAreaBox
            label={t("sendpage02NoteModal_2")}  /* 메모 */
            isReadOnly={true}
            value={noteValue}
          />
        </div>
        <ContainedButton
          disabled={isLoading}
          type="primary"
          styles="filled"
          states="default"
          size="large"
          label={t("sendConfirmModal8")}
          onClick={sendOnClick}
        />
      </MainInfoBox>
    </FullContainer>
  );
};

const NoteModalInner = (
  setSendModalStep,
  sendModalStep,
  noteValue,
  setNoteValue,
) => {
  const [byteCount, setByteCount] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    setByteCount(byteCountInUtf8Bytes(noteValue));
  }, [noteValue])

  const noteBtnOnClick = () => {
    setSendModalStep(sendModalStep + 1);
  }

  const noteOnChange = (e) => {
    if (byteCountInUtf8Bytes(e.target.value) <= 180) {
      setNoteValue(e.target.value);
      setByteCount(byteCountInUtf8Bytes(e.target.value));
    }
  }

  const byteCountInUtf8Bytes = (text) => {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      if (charCode < 0x007f) {
        count += 1;
      } else if (charCode >= 0x0080 && charCode <= 0xffff) {
        count += 2;
      }
    }
    return count;
  }

  return(
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>{t("sendpage02NoteModal_1")}</FirstIntro> {/* 메모 쓰기 */}
      </IntroTextBox>
      <hr style={{ background: `${palette.grey_7}`, height: '1px', border: '0' }} />
      <MainInfoBox>
        <ImageBanner 
          description={t("sendpage02NoteModal_5")}
          title={t("sendpage02NoteModal_6")}
          image={TwitterImage}
        />
        <div style={{ marginTop: "20px", marginBottom: "80px" }}>
          <TextAreaBox
            label={t("sendpage02NoteModal_2")}  /* 메모 */
            placeholder={t("sendpage02NoteModal_3")} /* 받는분께 전달한~ */ 
            value={noteValue}
            onChange={noteOnChange}
            maxSize={180}
            isByte
            count={byteCount}
          />
        </div>
        <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label={t("sendpage02NoteModal_4")} /* 다음 */
            onClick={noteBtnOnClick} /* 메모 백엔드에 전송 api 호출 ? */
          />
        </MainInfoBox>
    </FullContainer>
  )
}

const CheckSendModal = ({
  visible,
  closable,
  maskClosable,
  onClose,
  amount,
  currency,
  sender,
  platformIcon,
  platform,
  receiver,
  stepStatus,
  setStepStatus,
  networkId,
  userIdx,
  address,
  setExpired,
  setFinalLink,
  tokenInfo,
  setLoading,
  setFailed,
  resend,
  setSendModalStep,
  sendModalStep,
  btnOnClick,
  noteValue,
  setNoteValue
}) => {
  return (
    <>
    {(sendModalStep === 1) && (
      <BottomModal
        visible={visible}
        closable={closable}
        maskClosable={maskClosable}
        onClose={onClose}
        renderInput={() =>
          NoteModalInner(
            setSendModalStep,
            sendModalStep,
            noteValue,
            setNoteValue,
          )
        }
      />
    )}
    {(sendModalStep === 2) && (
      <BottomModal
        visible={visible}
        closable={closable}
        maskClosable={maskClosable}
        onClose={onClose}
        backBtn
        btnOnClick={btnOnClick}
        renderInput={() =>
          LoginModalInner(
            amount,
            currency,
            sender,
            platformIcon,
            platform,
            receiver,
            stepStatus,
            setStepStatus,
            onClose,
            networkId,
            userIdx,
            address,
            setExpired,
            setFinalLink,
            tokenInfo,
            setLoading,
            setFailed,
            resend,
            setSendModalStep,
            sendModalStep,
            noteValue,
          )
        }
      />
    )}
    </>
  );
};

export default CheckSendModal;
