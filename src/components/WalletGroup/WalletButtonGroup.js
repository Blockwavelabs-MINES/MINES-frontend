import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typography from "../../utils/style/Typography";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../utils/functions/useWindowDimensions";
import WalletList from "../../data/WalletListData";
import WalletListMobile from "../../data/WalletListDataMobile";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const BoxContainer = styled.div`
  width: 90%;
  max-width: 856px;
  // min-height: 288px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  // grid-auto-rows: ?;
  margin: 0px auto;
  margin-top: 30px;
`;

const WalletButton = styled.button`
  max-width: 420px;
  height: 60px;
  display: flex;
  justify-content: left;
  background-color: ${palette.light_gray_alpha20};
  border: 0;
  border-radius: 10px;
  padding: 12px 24px 12px 24px;
  ${Typography.Heading3}
  margin: 0px auto;
  width: 100%;
`;

const WalletIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const WalletName = styled.div`
  ${Typography.Heading3}
  margin: auto 0px;
  margin-left: 16px;
`;

function isMobileDevice() {
  return (
    ("ontouchstart" in window || "onmsgesturechange" in window) &&
    !window.ethereum
  );
}

const metamaskOnClick = (onConnected) => {
  // if (!window.ethereum) {
  //   alert("Get MetaMask!");
  //   return;
  // }
  return new Promise(async (resolve, reject) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      console.log(accounts[0]);
      onConnected(accounts[0]);
    } catch (error) {
      if (isMobileDevice()) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          onConnected(accounts[0]);
        } catch (error) {
          alert(error.message);
          console.error(error.message);
        }
      } else {
        alert(error.message);
        console.error(error.message);
      }
    }
  });
  // const accounts = await window.ethereum.request({
  //   method: "eth_requestAccounts",
  // });
};

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    console.log("nnn");
    // const accounts = await window.ethereum.request({
    //   method: "eth_accounts",
    // });

    // if (accounts.length > 0) {
    //   const account = accounts[0];
    //   onConnected(account);
    //   return;
    // }

    if (isMobileDevice()) {
      await metamaskOnClick(onConnected); // metamask
    }
  }
}

const WalletButtonGroup = (props) => {
  const { height, width } = useWindowDimensions();
  const [walletAddress, setWalletAddress] = useState("");
  const [alreadySignup, setAlreadySignup] = useState(0);
  const [walletIdNum, setWalletIdNum] = useState(-1);
  const [buttonWidth, setButtonWidth] = useState();
  const { chainId, account, active, activate, deactivate } = useWeb3React();

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };
  const walletconnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  // useEffect(() => {}, [ref.current]);

  useEffect(() => {
    checkIfWalletIsConnected(setWalletAddress);
  }, []);

  useEffect(() => {
    console.log(account);
    if (account) {
      setWalletAddress(account);
    }
  }, [account]);

  // useEffect(() => {
  //   const provider = window.localStorage.getItem("provider");
  //   if (provider) activate(walletconnect);
  // }, []);

  useEffect(() => {
    console.log(props);
    if (props.setPageStack) {
      if (walletAddress) {
        props.setPageStack(walletAddress);
        deactivate();
        setWalletAddress();
      }
      props.setWalletId(walletIdNum);
      console.log(walletAddress);
      console.log(walletIdNum);
      localStorage.setItem("currentWallet", walletAddress);
      localStorage.setItem("currentWalletType", walletIdNum);
    }
  }, [walletAddress]);

  const connectOnClick = async (walletID) => {
    setWalletIdNum(walletID);
    console.log(walletID);
    let constWalletList = WalletList;
    if (isMobileDevice()) {
      constWalletList = WalletListMobile;
    }
    if (constWalletList[walletID].walletName == "WalletConnect") {
      // console.log(process.env.REACT_APP_INFURA_KEY)
      activate(walletconnect, (error) => {
        if ("/No Ethereum provider was found on window.ethereum/".test(error)) {
          window.open("https://metamask.io/download.html");
        }
      }).then((result) => {
        console.log(result);
        console.log(chainId);
        console.log(account);
      });
      setProvider("walletConnect");
    } else {
      const connectWalletResult = await constWalletList[walletID]
        .action(setWalletAddress)
        .then((data) => {
          console.log("hello");
          console.log(data);
        })
        .catch((err) => console.log("???"));
    }
  };

  return (
    <React.Fragment>
      <BoxContainer
        style={
          width > 600 && props.columnNum != 1
            ? {}
            : { gridTemplateColumns: "repeat(1, 1fr)" }
        }
      >
        {isMobileDevice() ? (
          <React.Fragment>
            {WalletListMobile.map((val, idx) => (
              <React.Fragment>
                <WalletButton onClick={() => connectOnClick(idx)}>
                  <WalletIcon src={val.walletIcon} />
                  <WalletName>{val.walletName}</WalletName>
                </WalletButton>
              </React.Fragment>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {WalletList.map((val, idx) => (
              <React.Fragment>
                {WalletList[idx].action ? (
                  <WalletButton onClick={() => connectOnClick(idx)}>
                    <WalletIcon src={val.walletIcon} />
                    <WalletName>{val.walletName}</WalletName>
                  </WalletButton>
                ) : (
                  <WalletButton style={{ backgroundColor: palette.gray }}>
                    <WalletIcon src={val.walletIcon} />
                    <WalletName>{val.walletName}</WalletName>
                  </WalletButton>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </BoxContainer>
    </React.Fragment>
  );
};

export default WalletButtonGroup;
