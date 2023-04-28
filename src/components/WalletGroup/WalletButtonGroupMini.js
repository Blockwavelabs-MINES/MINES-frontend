import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import WalletList from "datas/WalletListData";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useWindowDimensions from "utils/functions/useWindowDimensions";
import { COLORS as palette } from "utils/styles/colors";

const BoxContainer = styled.div`
  width: 100%;
  max-width: 856px;
  min-height: 288px;
  justify-content: center;
  margin: 0px auto;
  margin-top: 20px;
`;

const WalletButton = styled.button`
  max-width: 88px;
  height: 88px;
  background-color: ${palette.white};
  border: 0;
  border-radius: 10px;
  padding: 14px 0px;
  font-family: Montserrat;
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0px auto;
  width: 100%;
  margin: 13px 6px;
  filter: drop-shadow(0px 1.7px 8.86px #c4c4c444);
  &:hover {
    box-shadow: 0 0 0 1px ${palette.blue} inset;
  }
`;

const WalletIcon = styled.img`
  width: 39px;
  height: 39px;
  margin-bottom: 7px;
`;

const WalletName = styled.div`
  font-family: Montserrat;
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: center;
  margin: auto 0px;
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
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
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
        }
      } else {
        alert(error.message);
      }
    }
  });
};

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum && isMobileDevice()) {
    await metamaskOnClick(onConnected); // metamask
  }
}

const WalletButtonGroupMini = (props) => {
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
  });

  useEffect(() => {
    checkIfWalletIsConnected(setWalletAddress);
  }, []);

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
    }
  }, [account]);

  useEffect(() => {
    if (props.setPageStack) {
      props.setPageStack(walletAddress);
      props.setWalletId(walletIdNum);
      localStorage.setItem("currentWallet", walletAddress);
      localStorage.setItem("currentWalletType", walletIdNum);
    }
  }, [walletAddress]);

  const connectOnClick = async (walletID) => {
    setWalletIdNum(walletID);
    if (WalletList[walletID].walletName == "WalletConnect") {
      activate(walletconnect, (error) => {
        if ("/No Ethereum provider was found on window.ethereum/".test(error)) {
          window.open("https://metamask.io/download.html");
        }
      });
      setProvider("walletConnect");
    } else {
      await WalletList[walletID]
        .action(setWalletAddress)
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <BoxContainer
        style={
          width > 600 && props.columnNum != 1
            ? {}
            : { gridTemplateColumns: "repeat(1, 1fr)" }
        }
      >
        {isMobileDevice() ? (
          <>
            {WalletList.map((val) => (
              <>
                {val.deepLink && (
                  <a href={val.deepLink}>
                    <WalletButton>
                      <WalletIcon src={val.walletIcon} />
                      <WalletName>{val.walletName.split(" ")[0]}</WalletName>
                    </WalletButton>
                  </a>
                )}
              </>
            ))}
          </>
        ) : (
          <>
            {WalletList.map((val, idx) => (
              <>
                {WalletList[idx].action ? (
                  <WalletButton onClick={() => connectOnClick(idx)}>
                    <WalletIcon src={val.walletIcon} />
                    <WalletName>{val.walletName.split(" ")[0]}</WalletName>
                  </WalletButton>
                ) : (
                  <WalletButton style={{ backgroundColor: palette.gray }}>
                    <WalletIcon src={val.walletIcon} />
                    <WalletName>{val.walletName.split(" ")[0]}</WalletName>
                  </WalletButton>
                )}
              </>
            ))}
          </>
        )}
      </BoxContainer>
    </>
  );
};

export default WalletButtonGroupMini;
