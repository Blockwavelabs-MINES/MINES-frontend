import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import WalletList from "data/WalletListData";
import WalletListMobile from "data/WalletListDataMobile";
import NetworkList from "pages/SendTokenStepsPage/components/NetworkList";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useWindowDimensions from "utils/functions/useWindowDimensions";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography";

const BoxContainer = styled.div`
  width: 90%;
  max-width: 856px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
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
  return new Promise(async () => {
    try {
      const accounts = await window.ethereum?.request({
        method: "eth_accounts",
      });

      onConnected(accounts[0]);
    } catch (error) {
      if (isMobileDevice()) {
        try {
          const accounts = await window.ethereum?.request({
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
};

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum && isMobileDevice()) {
    await metamaskOnClick(onConnected); // metamask
  }
}

const WalletButtonGroup = (props) => {
  const { width } = useWindowDimensions();
  const [walletAddress, setWalletAddress] = useState("");
  const [walletIdNum, setWalletIdNum] = useState(-1);
  const { chainId, account, activate } = useWeb3React();
  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };
  const walletconnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    chainId: 137,
  });

  useEffect(() => {
    checkIfWalletIsConnected(setWalletAddress);
  }, []);

  useEffect(() => {
    (async () => {
      if (account) {
        setWalletAddress(account);
        props.setNetworkId(chainId);
        props.setNetwork(
          NetworkList[NetworkList.findIndex((v) => v.chainId == chainId)]?.name
        );
        props.setCurrency(
          NetworkList[NetworkList.findIndex((v) => v.chainId == chainId)]
            ?.nativeCurrency?.symbol
        );
        let rpcURL = process.env.REACT_APP_GO_URL;
        if (chainId == 137) {
          rpcURL = process.env.REACT_APP_POLYGON_URL;
        }
      }
    })();
  }, [account]);

  useEffect(() => {
    if (props.setPageStack) {
      if (walletAddress) {
        props.setPageStack(walletAddress);
        setWalletAddress();
      }
      props.setWalletId(walletIdNum);
      localStorage.setItem("currentWallet", walletAddress);
      localStorage.setItem("currentWalletType", walletIdNum);
    }
  }, [walletAddress]);

  const connectOnClick = async (walletID) => {
    setWalletIdNum(walletID);
    let constWalletList = WalletList;
    if (isMobileDevice()) {
      constWalletList = WalletListMobile;
    }
    if (constWalletList[walletID].walletName == "WalletConnect") {
      activate(walletconnect, (error) => {
        if ("/No Ethereum provider was found on window.ethereum/".test(error)) {
          window.open("https://metamask.io/download.html");
        }
      });
      setProvider("walletConnect");
    } else {
      await constWalletList[walletID]
        .action(setWalletAddress)
        .catch((e) => console.log(e));
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
