import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import DropBox from "./Dropbox";
import MetamaskChainList from "./MetamaskChainlist";
import PlatformList from "./PlatformList";
import { MetamaskIcon } from "../../../assets/icons";

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
  height: 40px;
  width: 100%;
  border-radius: 10px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${palette.background};
  display: flex;
  justify-content: left;
  align-items: center;
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
  font-family: Pretendard;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.gray};
  margin-bottom: 30px;
`;

const HelpTextLi = styled.li`
  padding-left: 1.28571429em;
  text-indent: -1.28571429em;
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

const Step2 = ({
  setWalletType,
  setAddress,
  setNetwork,
  setNetworkId,
  setCurrency,
  walletType,
  address,
  network,
  networkId,
  currency,
}) => {
  useEffect(() => {
    (async () => {
      setWalletType("Metamask");

      await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log(account);
      setAddress(account);
      window.ethereum.on("accountsChanged", function (accounts) {
        // Time to reload your interface with accounts[0]!
        console.log(accounts[0]);
        setAddress(accounts[0]);
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await window.ethereum.enable();
      const currentNetwork = window.ethereum.networkVersion;
      console.log(currentNetwork);
      setNetworkId(currentNetwork);
      setNetwork(
        MetamaskChainList[
          MetamaskChainList.findIndex(
            (v) => v.pageProps.chain.chainId == currentNetwork
          )
        ].pageProps.chain.name
      );
      setCurrency(
        MetamaskChainList[
          MetamaskChainList.findIndex(
            (v) => v.pageProps.chain.chainId == currentNetwork
          )
        ].pageProps.chain.nativeCurrency.symbol
      );
      window.ethereum.on("chainChanged", function (chainId) {
        // Time to reload your interface with accounts[0]!
        console.log(chainId);
        setNetwork(
          MetamaskChainList[
            MetamaskChainList.findIndex(
              (v) => v.pageProps.chain.chainId == chainId
            )
          ].pageProps.chain.name
        );
        setNetworkId(chainId);
        setCurrency(
          MetamaskChainList[
            MetamaskChainList.findIndex(
              (v) => v.pageProps.chain.chainId == chainId
            )
          ].pageProps.chain.nativeCurrency.symbol
        );
      });
    })();
  }, []);

  return (
    <Container>
      <ConnectedBox>
        <BoxHeader>Connected Wallet</BoxHeader>
        <WalletContainer>
          <IconBox src={MetamaskIcon} />
          <AddressBox>{walletConvert(address)}</AddressBox>
        </WalletContainer>
      </ConnectedBox>
      <NetworkBox>
        <BoxHeader>Network</BoxHeader>
        <NetworkText>
          {
            MetamaskChainList[
              MetamaskChainList.findIndex(
                (v) => v.pageProps.chain.chainId == networkId
              )
            ]?.pageProps.chain.name
          }
        </NetworkText>
      </NetworkBox>
      <Divider />
      <HelpTextContainer>
        지갑과 네트워크를 전환하고 싶으신가요? <br />
        <HelpTextLi>
          메타마스크에서 원하는 계정과 네트워크로 전환해주세요. 전환하면
          자동으로 인식됩니다.
        </HelpTextLi>
      </HelpTextContainer>
    </Container>
  );
};

export default Step2;
