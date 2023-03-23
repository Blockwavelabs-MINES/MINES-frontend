import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import MetamaskChainList from "./MetamaskChainlist";
import { MetamaskIcon, GoogleIcon } from "../../../assets/icons";
import { DropIcon, InputHelp, InputError } from "../../../assets/icons";
import { ContainedButton } from "../../../components/button";
import { Tooltip } from "../../../components/card";
import Chainlist from "../data/SimpleTokenList";
// import BigNumber from "big-number";
// import math from "math.js";
import { add, bignumber, format, subtract } from "mathjs";
import { useTranslation } from "react-i18next";
import { MobileNetworkBox, TokenBottomModal, CheckSendModal, DropBox } from ".";

const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
`;

const ConnectedBox = styled.div`
  width: 100%;
`;

const NetworkBox = styled.div`
  width: 100%;
`;

const BoxHeader = styled.li`
  font-family: Pretendard;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.gray};
  margin-bottom: 4px;
`;

const WalletContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
`;

const IconBox = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const AddressBox = styled.div`
  font-family: Roboto Mono;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
`;

const NetworkText = styled.div`
  height: 37px;
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid ${palette.light_gray};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.light_gray};
  margin-top: 27px;
  margin-bottom: 27px;
`;

const HelpTextContainer = styled.div`
  width: 100%;
  display: flex;
  color: ${palette.gray};
  margin-bottom: 30px;
  align-items: center;
`;

const HelpText = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_4};
`;

const HelpTextLi = styled.li`
  padding-left: 1.28571429em;
  text-indent: -1.28571429em;
`;

const EmailCheckBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EmailInfo = styled.div`
  display: flex;
  align-items: center;
`;

const EmailIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

const EmailBox = styled.div`
  ${Typography.Headline3}
  color: ${palette.Black};
`;

const EmailBoxText = styled.div`
  ${Typography.Subhead}
  color: ${palette.Black};
`;

const SendContainer = styled.div`
  display: inline-block;
  align-items: center;
  margin-top: 36px;
`;

const SelectTokenBox = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 104px;
  width: auto;
  height: 40px;
  border-radius: 20px;
  background-color: ${palette.white};
  padding: 8px 6px;
  border: 1px solid ${palette.grey_7};
  margin: 0px auto;
  margin-bottom: 30px;
`;

const TokenInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TokenIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

const TokenName = styled.div`
  ${Typography.Headline2}
  color: ${palette.Black};
`;

const DropIconBox = styled.img`
  width: 24px;
  height: 24px;
`;

const AmountInputBox = styled.input`
  border: hidden;
  width: 100%;
  height: 41px;
  padding: 0px 10px;
  ${Typography.Title2}
  text-align: center;
  &::-webkit-input-placeholder {
    color: ${palette.grey_4};
  }
  &:focus {
    outline: none;
  }
`;

const NetworkWalletInfoBox = styled.div`
  border-radius: 8px;
  border: 1px solid ${palette.sky_3};
  background-color: ${palette.sky_4};
  padding: 20px 16px;
  margin-top: 38px;
`;

const NetworkNameBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const NetworkStatusCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${palette.green_1};
  margin: 5px;
`;

const NetworkName = styled.div`
  ${Typography.Caption1}
  color: ${palette.grey_3};
`;

const WalletTitle = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_3};
  margin-top: 21px;
`;

const StepButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const ErrorBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  margin-top: 4px;
`;

const ErrorIconBox = styled.img`
  width: 12px;
  height: 12px;
`;

const ErrorText = styled.div`
  ${Typography.Caption2}
  color: ${palette.red_1};
`;

const InfoIconBox = styled.img`
  width: 13px;
  height: 13px;
  margin-left: 4px;
`;

const TooltipStyle = styled.div`
  ${Typography.Footer}
  color: ${palette.white};
  text-align: left;
  font-family: Montserrat;
`;

const NoticeIcon = styled.button`
  width: 16px;
  height: 16px;
  background-image: url(${InputHelp});
  background-size: 13px 13px;
  background-repeat: no-repeat;
  background-position: center;
  border: hidden;
  background-color: transparent;
  position: relative;
  margin-left: 4px;
`;

const CurrentBalanceText = styled.div`
  height: 30px;
  width: 100%;
  ${Typography.Headline3}
  color: ${palette.grey_5};
  text-align: center;
  margin-top: 28px;
`;

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

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

function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
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

const Step2 = ({
  setWalletType,
  setAddress,
  setNetwork,
  setNetworkId,
  setCurrency,
  setStepStatus,
  walletType,
  address,
  network,
  networkId,
  currency,
  email,
  platformIcon,
  userId,
  stepStatus,
  userIdx,
  setExpired,
  setFinalLink,
  setLoading,
  setFailed,
  resend,
  setBalance,
  balance,
  setRealBalance,
  realBalance,
}) => {
  const [amount, setAmount] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [notiClick, setNotiClick] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [tokenInfo, setTokenInfo] = useState({});
  const [undefinedChain, setUndefinedChain] = useState(true);
  const [isFinalCheck, setIsFinalCheck] = useState(false);
  const { t } = useTranslation();
  const TooltipText = (
    <TooltipStyle>
      {/* 이더리움 메인넷 (ETH)
      <br /> */}
      {t("sendpage02_17")}
      <br />
      {t("sendpage02_15")}
    </TooltipStyle>
  );

  useEffect(() => {
    console.log(networkId + "networkId");
    console.log(
      Chainlist[Chainlist.findIndex((v) => v.chainId == networkId)]
        ?.tokenList[0]
    );

    setTokenList(
      Chainlist[Chainlist.findIndex((v) => v.chainId == networkId)]?.tokenList
    );
    if (Chainlist.findIndex((v) => v.chainId == networkId) != -1) {
      setTokenInfo(
        Chainlist[Chainlist.findIndex((v) => v.chainId == networkId)]
          ?.tokenList[0]
      );
      console.log(tokenInfo);
    } else {
      console.log("hi");
      setTokenInfo({});
    }
  }, [networkId]);

  useEffect(() => {
    if (!(isInt(Number(amount)) || isFloat(Number(amount)))) {
      setErrorMessage(t("sendpage02_3"));
    } else if (Number(amount) > Number(realBalance)) {
      setErrorMessage(t("sendpage02_7"));
    } else if (amount == "" || Number(amount) == 0) {
      console.log(Number(amount));
      setErrorMessage(t("sendpage02_5"));
    } else if (Number(amount) < 0) {
      setBalance(0);
      setErrorMessage(t("sendpage02_4"));
    } else if (isFloat(Number(amount)) && String(amount).split(".")[1]) {
      if (String(amount).split(".")[1].length > 18) {
        setErrorMessage(t("sendpage02_6"));
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  }, [amount]);

  useEffect(() => {
    (async () => {
      const account = address;
      // get balance of custom token (start)
      const Web3 = require("web3");
      let rpcURL = process.env.REACT_APP_GO_URL;
      if (networkId == 137) {
        rpcURL = process.env.REACT_APP_POLYGON_URL;
      }
      const web3 = new Web3(rpcURL);

      let tokenAddress = tokenInfo.address;
      let walletAddress = account;
      console.log(tokenAddress);

      // The minimum ABI to get ERC20 Token balance
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
      ];

      let contract = new web3.eth.Contract(minABI, tokenAddress);
      async function getBalance() {
        let balance = await contract.methods.balanceOf(walletAddress).call();
        balance = balance / Math.pow(10, tokenInfo.decimals);
        return balance;
      }

      getBalance()
        .then(function (result) {
          console.log(result);
          if (String(result).includes("e")) {
            // alert(result)
            setBalance(
              result * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
            );
            setRealBalance(
              result * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
            );
          } else {
            // alert(result)
            setBalance(result);
            setRealBalance(result);
          }
        })
        .catch(async (err) => {
          if (
            !err
              .toString()
              .startsWith(
                "Error: Returned values aren't valid, did it run Out of Gas? "
              )
          ) {
            if (isMobileDevice()) {
              const tmpBalance = await web3.eth
                .getBalance(address)
                .then((result) => {
                  setBalance(result / Math.pow(10, 18));
                  setRealBalance(result / Math.pow(10, 18));
                });
            } else {
              let metamaskProvider = "";
              if (window.ethereum.providers) {
                metamaskProvider = window.ethereum.providers.find(
                  (provider) => provider.isMetaMask
                );
              } else {
                metamaskProvider = window.ethereum;
              }

              const isMetamask = metamaskProvider.isMetaMask;

              console.log("isMetamask? ", isMetamask);
              let balance = "0";

              balance = await metamaskProvider.request({
                method: "eth_getBalance",
                params: [address, "latest"],
              });

              const decimal = parseInt(balance, 16) / Math.pow(10, 18);
              console.log(decimal);
              if (String(decimal).includes("e")) {
                setBalance(
                  decimal * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
                );
                setRealBalance(
                  decimal * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
                );
              } else {
                setBalance(toFixed(decimal));
                setRealBalance(toFixed(decimal));
              }
            }
          } else {
            // 해당 token(asset)이 아예 존재하지 않으면
            setBalance("0");
            setRealBalance("0");
          }
        });
      // get balance of custom token (end)
    })();
  }, [tokenInfo, address]);

  useEffect(() => {
    (async () => {
      setWalletType("Metamask");
      let metamaskProvider = "";
      if (window.ethereum.providers) {
        metamaskProvider = window.ethereum.providers.find(
          (provider) => provider.isMetaMask
        );
      } else {
        metamaskProvider = window.ethereum;
      }

      const isMetamask = metamaskProvider.isMetaMask;

      console.log("isMetamask? ", isMetamask);

      await metamaskProvider.enable();
      const accounts = await metamaskProvider.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];
      console.log(account);
      setAddress(account);

      const balance = await metamaskProvider.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });

      metamaskProvider.on("accountsChanged", function (accounts) {
        // Time to reload your interface with accounts[0]!
        console.log(accounts[0]);
        setAddress(accounts[0]);
      });

      const decimal = parseInt(balance, 16) / Math.pow(10, 18);
      console.log(decimal);
      if (String(decimal).includes("e")) {
        setBalance(decimal * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12));
        setRealBalance(
          decimal * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
        );
      } else {
        setBalance(toFixed(decimal));
        setRealBalance(toFixed(decimal));
      }

      metamaskProvider.on("chainChanged", async function (chainId) {
        // Time to reload your interface with accounts[0]!
        const balance2 = await metamaskProvider.request({
          method: "eth_getBalance",
          params: [account, "latest"],
        });
        // const balance = accounts[0];

        const decimal2 = parseInt(balance2, 16) / Math.pow(10, 18);
        console.log(decimal2);
        if (String(decimal2).includes("e")) {
          setBalance(
            decimal2 * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
          );
          setRealBalance(
            decimal2 * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
          );
        } else {
          setBalance(toFixed(decimal2));
          setRealBalance(toFixed(decimal2));
        }
      });

      // const currentNetwork = parseInt(metamaskProvider.networkVersion, 16);
      const currentNetwork = metamaskProvider.networkVersion;
      console.log(currentNetwork);
      setNetworkId(currentNetwork);
      console.log(MetamaskChainList);
      if (currentNetwork == 5 || currentNetwork == 137) {
        // 현재 지원하는 네트워크 유효성 검사
        setNetwork(
          MetamaskChainList[
            MetamaskChainList.findIndex(
              (v) => v.pageProps.chain.chainId == currentNetwork
            )
          ].pageProps.chain.name
        );
      } else {
        setNetwork(t("sendpage02_13"));
      }

      setCurrency(
        MetamaskChainList[
          MetamaskChainList.findIndex(
            (v) => v.pageProps.chain.chainId == currentNetwork
          )
        ].pageProps.chain.nativeCurrency.symbol
      );
      metamaskProvider.on("chainChanged", function (chainId) {
        // Time to reload your interface with accounts[0]!
        const decChainId = parseInt(chainId, 16);
        console.log(decChainId);
        if (decChainId == 5 || decChainId == 137) {
          // 현재 지원하는 네트워크 유효성 검사
          setNetwork(
            MetamaskChainList[
              MetamaskChainList.findIndex(
                (v) => v.pageProps.chain.chainId == decChainId
              )
            ].pageProps.chain.name
          );
        } else {
          setNetwork(t("sendpage02_13"));
        }

        setNetworkId(decChainId);
        setCurrency(
          MetamaskChainList[
            MetamaskChainList.findIndex(
              (v) => v.pageProps.chain.chainId == decChainId
            )
          ].pageProps.chain.nativeCurrency.symbol
        );
      });
    })();
  }, []);

  const sendOnClick = () => {
    setIsFinalCheck(true);
  };

  const maxOnClick = () => {
    setAmount(balance);
    setBalance(0);
  };

  const notiOnClose = () => {
    setNotiClick(false);
  };

  return (
    <Container>
      {tokenOpen && tokenList ? (
        <TokenBottomModal
          visible={tokenOpen}
          closable={true}
          maskClosable={true}
          onClose={() => setTokenOpen(false)}
          tokenList={tokenList}
          setTokenInfo={setTokenInfo}
          networkId={networkId}
        />
      ) : (
        <>
          {isFinalCheck ? (
            <CheckSendModal
              visible={isFinalCheck}
              closable={true}
              maskClosable={true}
              onClose={() => setIsFinalCheck(false)}
              amount={amount}
              currency={tokenInfo.symbol}
              sender={userId}
              platform={platformIcon}
              receiver={email}
              stepStatus={stepStatus}
              setStepStatus={setStepStatus}
              networkId={networkId}
              userIdx={userIdx}
              address={address}
              setExpired={setExpired}
              setFinalLink={setFinalLink}
              tokenInfo={tokenInfo}
              setLoading={setLoading}
              setFailed={setFailed}
              resend={resend}
            />
          ) : (
            <></>
          )}
        </>
      )}
      <EmailCheckBox>
        <EmailInfo>
          <EmailIcon src={platformIcon} />
          <EmailBox>{email}</EmailBox>
        </EmailInfo>
        <EmailBoxText>{t("sendpage02_1")}</EmailBoxText>
      </EmailCheckBox>
      <SendContainer>
        <SelectTokenBox onClick={() => setTokenOpen(true)}>
          <TokenInfo>
            {tokenInfo?.symbol ? (
              <>
                <TokenIcon src={tokenInfo?.logoURI} />
                <TokenName>{tokenInfo?.symbol}</TokenName>
              </>
            ) : (
              <></>
            )}
          </TokenInfo>
          <DropIconBox src={DropIcon} />
        </SelectTokenBox>
        <AmountInputBox
          placeholder={t("sendpage02_2")}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            if (
              (isInt(Number(e.target.value)) ||
                isFloat(Number(e.target.value))) &&
              !(Number(e.target.value) > Number(realBalance))
            ) {
              const result = subtract(
                // bignumber(0.00006326),
                // bignumber(0.0000632)
                // bignumber(Number(realBalance)),
                bignumber(Number(realBalance)),
                bignumber(Number(e.target.value))
                // bignumber(Number(e.target.value))
              );
              // console.log(toFixed(tmpBalance));
              const tmpBalance = toFixed(format(result));
              setBalance(tmpBalance);
              console.log(
                "전송 후 잔액 , ",
                // Number(realBalance) - Number(e.target.value)
                tmpBalance
              );
            } else {
              setBalance(toFixed(realBalance));
            }
          }}
        />
        {errorMessage ? (
          <ErrorBox>
            <ErrorIconBox src={InputError} />
            <ErrorText>{errorMessage}</ErrorText>
          </ErrorBox>
        ) : (
          <></>
        )}
        {realBalance == balance ? (
          <ContainedButton
            type="secondary"
            styles="outlined"
            states="default"
            size="small"
            label={
              balance
                ? `${t("sendpage02_8")}${balance} ${currency}${t(
                    "sendpage02_9"
                  )}`
                : t("sendpage02_10")
            }
            style={{ margin: "0px auto", marginTop: "32px" }}
            onClick={maxOnClick}
          />
        ) : (
          <CurrentBalanceText>
            {t("sendpage02_11")}
            {balance} {currency}
          </CurrentBalanceText>
        )}
      </SendContainer>
      <>
        {isMobileDevice() ? (
          <MobileNetworkBox
            networkId={networkId}
            setNetworkId={setNetworkId}
            network={network}
          />
        ) : (
          <>
            <NetworkWalletInfoBox>
              <NetworkNameBox>
                {network == t("sendpage02_13") || !network ? (
                  <>
                    {/* <NetworkStatusCircle style={{backgroundColor:palette.red_2}}/> */}
                    <NetworkName style={{ color: palette.red_2 }}>
                      {" "}
                      {t("sendpage02_13")}
                    </NetworkName>
                  </>
                ) : (
                  <>
                    <NetworkStatusCircle />
                    <NetworkName> {network}</NetworkName>
                  </>
                )}
              </NetworkNameBox>
              <WalletTitle>{t("sendpage02_12")}</WalletTitle>
              <WalletContainer>
                <IconBox src={MetamaskIcon} />
                <AddressBox>{walletConvert(address)}</AddressBox>
              </WalletContainer>
            </NetworkWalletInfoBox>
            <HelpTextContainer>
              <HelpText>{t("sendpage02_14")}</HelpText>
              <NoticeIcon onClick={() => setNotiClick(!notiClick)}>
                {notiClick ? (
                  <Tooltip
                    text={TooltipText}
                    visible={notiClick}
                    closable={true}
                    maskClosable={true}
                    onClose={notiOnClose}
                  />
                ) : (
                  <></>
                )}
              </NoticeIcon>
            </HelpTextContainer>
          </>
        )}
      </>
      <StepButtonContainer>
        {!errorMessage && tokenInfo?.symbol ? (
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label={t("sendpage02_16")}
            onClick={sendOnClick}
          />
        ) : (
          <ContainedButton
            type="primary"
            styles="filled"
            states="disabled"
            size="large"
            label={t("sendpage02_16")}
          />
        )}
      </StepButtonContainer>
    </Container>
  );
};

export default Step2;
