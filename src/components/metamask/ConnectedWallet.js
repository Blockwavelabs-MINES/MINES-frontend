import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import MetamaskChainList from "./data/MetamaskChainlist";

import styled from 'styled-components';
import { MetamaskIcon } from "assets/icons";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
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

const NetworkWalletInfoBox = styled.div`
  border-radius: 8px;
  border: 1px solid ${palette.sky_3};
  background-color: ${palette.sky_4};
  padding: 20px 16px;
  margin-top: 38px;
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

// 이 컴포넌트를 사용할 페이지에서 state를 넘겨주면 여기서 알아서 연결해줌
const ConnectedWallet = ({ 
  network,
  setNetwork,
  networkId,
  setNetworkId,
  address,
  setAddress
}) => {

  const { t } = useTranslation();

  useEffect(() => {
      (async () => {
        let metamaskProvider = "";
        if (window.ethereum.providers) {
          metamaskProvider = window.ethereum.providers.find(
            (provider) => provider.isMetaMask
          );
        } else {
          metamaskProvider = window.ethereum;
        }

        //계정 목록 가져오기.
        const accounts = await metamaskProvider.request({
          method: "eth_requestAccounts",
        });

        //첫 번째 계정을 선택.
        const account = accounts[0];
        setAddress(account);

        //계정이 변경될 때 잔액을 다시 가져오도록 등록.
        metamaskProvider.on("accountsChanged", function (accounts) {
          // 현재 계정 주소를 업데이트.
          setAddress(accounts[0]);
        });

        const currentNetwork = metamaskProvider.networkVersion;
        setNetworkId(currentNetwork);
        if (currentNetwork === '5') {
          // 현재 지원하는 네트워크 유효성 검사
          setNetwork(
            MetamaskChainList[
              MetamaskChainList.findIndex(
                (v) => v.pageProps.chain.chainId === Number(currentNetwork)
              )
            ].pageProps.chain.name
          );
        } else {
          setNetwork(t("sendpage02_13"));
        }

        metamaskProvider.on("chainChanged", function (chainId) {
          // Time to reload your interface with accounts[0]!
          const decChainId = parseInt(chainId, 16);
          // 현재 테스트 단계이므로 
          if (decChainId === 5 || decChainId === 137) {
            // 현재 지원하는 네트워크 유효성 검사
            setNetwork(
              MetamaskChainList[
                MetamaskChainList.findIndex(
                  (v) => v.pageProps.chain.chainId === decChainId
                )
              ].pageProps.chain.name
            );
          } else {
            setNetwork(t("sendpage02_13"));
          }

          setNetworkId(decChainId);
        });
      })();

  }, []);

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

  return (
    <Container>
      <NetworkWalletInfoBox>
        <NetworkName>
          {network === t("sendpage02_13") || !network ? (
            <>
              <NetworkName style={{ color: palette.red_2 }}>
                {t("sendpage02_13")}
              </NetworkName>
            </>
          ) : (
            <>
              <NetworkStatusCircle />
              <NetworkName>{network}</NetworkName>
            </>
          )}
        </NetworkName>
        <WalletTitle>{t("sendpage02_12")}</WalletTitle>
        <WalletContainer>
          <IconBox src={MetamaskIcon} />
          <AddressBox>{walletConvert(address)}</AddressBox>
        </WalletContainer>
      </NetworkWalletInfoBox>
    </Container>
  );
};

export default ConnectedWallet;