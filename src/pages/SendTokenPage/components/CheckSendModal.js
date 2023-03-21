import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { BottomModal } from "../../../components/modal";
import { Sender3TreeIcon } from "../../../assets/icons";
import { sendTrxs } from "../../../utils/api/trxs";
import { useTranslation } from "react-i18next";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  //   margin-top: 109px;
  //   padding: 20px;
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

const SecondIntro = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
  line-height: 23.8px;
  margin-top: 14px;
`;

const TermsBox = styled.div`
  margin-top: 64px;
  ${Typography.Caption2}
  color: ${palette.grey_5};
`;

const TokenListBox = styled.div`
  padding: 12px 8px;
  margin-top: 10px;
`;

const TokenListItem = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 20px 16px;
`;

const TokenIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin: 4px;
`;

const TokenTextInfo = styled.div`
  margin-left: 8px;
`;

const TokenCurrency = styled.div`
  margin-bottom: 4px;
  ${Typography.Heading2}
  ${palette.Black};
`;

const TokenSemi = styled.div`
  ${Typography.Caption2}
  ${palette.grey3};
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

const SendAmountText = styled.div`
  ${Typography.Subhead}
  color: ${palette.grey_1};
`;

const MainInfoBox = styled.div`
  padding: 22px 20px;
`;

const PersonInfoBox = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
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
  resend
) => {
  const { t } = useTranslation();
  const [transactionHash, setTransactionHash] = useState();
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [escrowId, setEscrowId] = useState();
  const [expiredDateResult, setExpiredDateResult] = useState();
  const { connector, active, provider, account, chainId, library } =
    useWeb3React();

  const Web3 = require("web3");
  let rpcURL = process.env.REACT_APP_GO_URL;
  if (networkId == 137) {
    rpcURL = process.env.REACT_APP_POLYGON_URL;
  }
  // const web3 = new Web3(rpcURL);
  let metamaskProvider = "";
  if (window?.ethereum?.providers) {
    metamaskProvider = window?.ethereum?.providers.find(
      (provider) => provider.isMetaMask
    );
  } else {
    if (isMobileDevice()) {
      metamaskProvider = library.provider;
    } else {
      metamaskProvider = window?.ethereum;
    }
  }
  const web3 = new Web3(metamaskProvider);

  useEffect(() => {
    console.log(resend);
    if (resend) {
      sendOnClick();
      // setLoading(true);
    }
  }, []);

  useEffect(() => {
    console.log(tokenInfo);
    console.log(tokenInfo.address + "this is tokenInfo.address");
    console.log(transactionHash);
    if (transactionHash) {
      console.log(transactionHash);
      // alert("in useEffect" + transactionHash);
      // setLoading(false); // failed창 테스트
      // setFailed(true); // failed창 테스트
      // Check the status of the transaction every 1 second
      const interval = setInterval(async () => {
        // web3.eth
        //   .getTransactionReceipt(
        //     transactionHash
        //     // "dfsdfdfd"
        //   )

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
            if (receipt == null) {
              console.log("pending");
              setTransactionStatus("pending");
              setLoading(true);
            } else {
              setTransactionStatus("mined");
              setLoading(false);
              await sendTrxs(
                address,
                "metamask",
                "google",
                receiver,
                currency,
                amount,
                transactionHash,
                escrowId,
                expiredDateResult,
                tokenInfo.address,
                networkId
              ).then((data) => {
                setFinalLink(data.linkKey);
                setExpired(data.expiredAt);
              });

              setStepStatus(stepStatus + 1);
              onClose();

              clearInterval(interval);
            }
          })
          .catch((err) => {
            // 존재하지 않는 hash 값일 경우 (+ pending이 길게 되어 tx가 사라진 경우)
            console.log(err);
            // alert(JSON.stringify(err));
            setLoading(false);
            setFailed(true);
            clearInterval(interval);
          });
      }, 1000);
    }
  }, [transactionHash]);

  console.log(amount);
  console.log(currency);
  const sendOnClick = async () => {
    document.body.style.overflow = "auto";
    console.log(tokenInfo);

    if (currency == "USDC" || currency == "USDT") {
      console.log("hi");
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
      ];
      let tempProvider = metamaskProvider;

      if (isMobileDevice()) {
        // tempProvider = new Web3Provider(metamaskProvider, "any");
        tempProvider = new Web3(new Web3.providers.HttpProvider(rpcURL));
      } else {
        tempProvider = new ethers.providers.Web3Provider(metamaskProvider);
      }
      // const tempSigner = web3.getSigner();
      // let tmpWeb3 = new Web3(rpcURL);

      // const tempContract = new web3.eth.Contract(
      //   minABI,
      //   tokenInfo.address
      //   // tempSigner
      // );
      async function sendToken() {
        setLoading(true);
        console.log("ho");
        if (isMobileDevice()) {
          const contract = new web3.eth.Contract(minABI, tokenInfo.address);
          const transferMethod = await contract.methods.transfer(
            process.env.REACT_APP_3TREE_ADDRESS,
            web3.utils.toHex(Number(amount) * Math.pow(10, tokenInfo.decimals))
          );
          const encodedData = await transferMethod.encodeABI();
          alert(encodedData);
          const tx = {
            // value: web3.utils.toHex(Number(amount) * Math.pow(10, 18)),
            data: encodedData,
            // gas: web3.utils.toHex(200000),
            // to: process.env.REACT_APP_3TREE_ADDRES,
            from: "0xfE9fDf1adC8Fa2DE65d3e26C0bFEF4C7F66e1120",
            address: "0xfE9fDf1adC8Fa2DE65d3e26C0bFEF4C7F66e1120",
          };
          metamaskProvider = library.provider;
          await metamaskProvider
            .request({
              method: "personal_sign",
              params: [encodedData, address],
            })
            .then(async (txHash) => {
              alert("hihi");
              alert(txHash);
              // alert(txHash.rawTransaction);
              // const transactionHash = await metamaskProvider.request({
              //   method: "eth_sendTransaction",
              //   params: [txHash.rawTransaction],
              // });
              // escrow hash와 id 생성 (with escrow Contract)
              // alert(transactionHash);
              const escrowHash = txHash;
              // const escrowHash = transactionHash;
              setEscrowId("1234"); // 현재는 escrow로 관리하지 않으므로 일단 임의의 값
              setExpiredDateResult(setExpiredDate());
              console.log(sender);
              console.log(tokenInfo.address);
              console.log(networkId);
              setTransactionHash(escrowHash);
              // alert(escrowHash);
            })
            .catch((error) => {
              // console.error;
              alert(JSON.stringify(error));
            });
        } else {
          const tempSigner = tempProvider.getSigner();
          let tempContract = new ethers.Contract(
            tokenInfo.address,
            minABI,
            tempSigner
          );

          const data = await tempContract.functions
            .transfer(
              process.env.REACT_APP_3TREE_ADDRESS,
              web3.utils.toHex(
                Number(amount) * Math.pow(10, tokenInfo.decimals)
              )
              // { from: address },
            )
            // .send({
            //   gasPrice: ethers.utils.parseUnits("20", "gwei"),
            //   gasLimit: 1000000,
            //   nonce: await metamaskProvider.getTransactionCount(address),
            //   from: address,
            // })
            .then((transaction) => {
              console.log("Transaction hash:", transaction.hash);
              transaction.wait().then(async (receipt) => {
                console.log("Transaction receipt:", receipt);
                if (receipt.status === 1) {
                  console.log("success");
                  const txHash = transaction.hash;
                  const escrowHash = txHash;
                  const escrowId = "1234";
                  const expiredDate = setExpiredDate();
                  console.log(expiredDate);
                  console.log(amount);
                  console.log(sender);
                  console.log(tokenInfo.address);
                  console.log(networkId);
                  // const sendTrxsResult = await sendTrxs(
                  //   userIdx,
                  //   address,
                  //   "metamask",
                  //   "google",
                  //   receiver,
                  //   currency,
                  //   amount,
                  //   escrowHash,
                  //   escrowId,
                  //   expiredDate,
                  //   sender,
                  //   tokenInfo.address,
                  //   networkId
                  // ).then((data) => {
                  //   setLoading(false);
                  //   setFinalLink(data.link_key);
                  //   setExpired(data.expired_at);
                  // });

                  //test
                  setLoading(false);
                  setFinalLink("sdsd");
                  setExpired("sdsdad");

                  //test
                  setStepStatus(stepStatus + 1);
                  onClose();
                } else if (receipt.status !== undefined) {
                  setLoading(false);
                  setFailed(true);
                }
              });
            });

          console.log("this is encodeABI()");
        }

        // console.log(data);
        // return data;
        // return returnValue;
      }

      sendToken();
      //   .then(async (data) => {
      //     console.log(data);
      //     // const txHash = data.transactionHash;
      //     const txHash = data;
      //     // const txHash = await web3.eth.sendTransaction({
      //     //   data: data,
      //     //   value: web3.utils.toHex(Number(amount) * Math.pow(10, 18)),
      //     //   gas: web3.utils.toHex(200000),
      //     //   to: process.env.REACT_APP_3TREE_ADDRES,
      //     //   from: address,
      //     // });
      //     // escrow hash와 id 생성 (with escrow Contract)
      //     console.log(txHash);
      //   })
      //   .catch((error) => console.error);
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
          await metamaskProvider
            .request({
              method: "eth_sendTransaction",
              params: [
                {
                  nonce: "0x00", // ignored by MetaMask
                  to: process.env.REACT_APP_3TREE_ADDRESS, // Required except during contract publications.
                  from: address, // must match user's active address.
                  gas: 60000,
                  // maxPriorityFee: (Math.pow(10, 8) * 0.1).toString(16),
                  value: (Math.pow(10, 18) * amount).toString(16), // Only required to send ether to the recipient from the initiating external account.
                  data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
                  chainId: networkId.toString(16), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
                },
              ],
            })
            .then(async (txHash) => {
              console.log(txHash);
              // escrow hash와 id 생성 (with escrow Contract)

              const escrowHash = txHash;
              setEscrowId("1234"); // 현재는 escrow로 관리하지 않으므로 일단 임의의 값
              setExpiredDateResult(setExpiredDate());
              console.log(sender);
              console.log(tokenInfo.address);
              console.log(networkId);
              setTransactionHash(escrowHash);
              // alert(escrowHash);
            })
            .catch((error) => {
              // console.error;
              // alert(error);
            });
        } else {
          metamaskProvider = window?.ethereum;
        }
      }

      if (!isMobileDevice()) {
        const Web3 = require("web3");
        const TokenABI = require("../../../utils/abis/IERC20_ABI");
        const web3 = new Web3(
          // window?.ethereum
          metamaskProvider
          // new Web3.providers.Web3Provider(window.ethereum)
        );

        const getGasAmount = async (fromAddress, toAddress, amount) => {
          const gasAmount = await web3.eth.estimateGas({
            to: toAddress,
            from: fromAddress,
            value: web3.utils.toWei(`${amount}`, "ether"),
          });
          console.log(gasAmount);
          return gasAmount;
        };

        const gasPrice = await web3.eth.getGasPrice();
        const gasAmount = await getGasAmount(
          address,
          process.env.REACT_APP_3TREE_ADDRESS,
          amount
          // web3.utils.toHex((Math.pow(10, 18) * amount).toString(16))
        );
        console.log(gasPrice);
        console.log(gasAmount);
        const fee = Number(gasPrice) * gasAmount;
        // const fee = Number(gasPrice) / 100;
        // const fee = gasAmount;
        // const fee = 20000000;

        await metamaskProvider
          .request({
            method: "eth_sendTransaction",
            params: [
              {
                nonce: "0x00", // ignored by MetaMask
                // gasPrice: (Math.pow(10, 8) * 0.1).toString(16), // customizable by user during MetaMask confirmation.
                // gas: (Math.pow(10, 6) * 0.1).toString(16), // customizable by user during MetaMask confirmation.
                // gas: String(fee), //이거임
                to: process.env.REACT_APP_3TREE_ADDRESS, // Required except during contract publications.
                from: address, // must match user's active address.
                // maxPriorityFeePerGas: (Math.pow(10, 8) * 0.1).toString(16),
                // maxPriorityFee: (Math.pow(10, 8) * 0.1).toString(16),
                maxPriorityFee: String(fee),
                // maxFeePerGas: (Math.pow(10, 8) * 0.1).toString(16),
                value: (Math.pow(10, 18) * amount).toString(16), // Only required to send ether to the recipient from the initiating external account.
                data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
                chainId: networkId.toString(16), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
              },
            ],
          })
          .then(async (txHash) => {
            console.log(txHash);
            // escrow hash와 id 생성 (with escrow Contract)

            const escrowHash = txHash;
            setEscrowId("1234"); // 현재는 escrow로 관리하지 않으므로 일단 임의의 값
            setExpiredDateResult(setExpiredDate());
            console.log(sender);
            console.log(tokenInfo.address);
            console.log(networkId);
            setTransactionHash(escrowHash);
          })
          .catch((error) => console.error);
      }
    }
  };

  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>{t("sendConfirmModal1")}</FirstIntro>
      </IntroTextBox>
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
          {/* <SendAmountText>를 보냅니다.</SendAmountText> */}
        </SendAmountInfo>
        <PersonInfoBox>
          <PersonInfoLine>
            <PersonCategory>{t("sendConfirmModal4")}</PersonCategory>
            <PersonInfo>
              <PersonId>{receiver}</PersonId>
              <PersonIcon src={platform} />
            </PersonInfo>
          </PersonInfoLine>
          <PersonInfoLine>
            <PersonCategory>{t("sendConfirmModal5")}</PersonCategory>
            <PersonInfo>
              <PersonId>@{sender}</PersonId>
              <PersonIcon src={Sender3TreeIcon} />
            </PersonInfo>
          </PersonInfoLine>
        </PersonInfoBox>
        <ContainedButton
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

const CheckSendModal = ({
  visible,
  closable,
  maskClosable,
  onClose,
  amount,
  currency,
  sender,
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
}) => {
  return (
    <BottomModal
      visible={visible}
      closable={closable}
      maskClosable={maskClosable}
      onClose={onClose}
      renderInput={() =>
        LoginModalInner(
          amount,
          currency,
          sender,
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
          resend
        )
      }
    />
  );
};

export default CheckSendModal;
