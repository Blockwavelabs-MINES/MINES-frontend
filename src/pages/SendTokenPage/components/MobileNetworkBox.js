import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { useTranslation } from "react-i18next";
import NetworkList from "./NetworkList";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { WalletConnectOnClick } from "../../../components/WalletGroup/WalletConnectActions";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { networkConnection, walletConnectConnection } from './connection'

const FullContainer = styled.div`
  width: 100%;
  margin-top: 62px;
`;

const NetworkHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NetworkHeaderTitle = styled.div`
  ${Typography.Headline2}
`;

const NetworkBox = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-itens: center;
  padding: 16px;
`;

const NetworkContent = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const NetworkIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 4px;
`;

const NetworkText = styled.div`
  font-family: Montserrat;
  font-size: 17px;
  font-weight: 600;
`;

export const switchChain = async (
  connector,
  chainId,
  account,
  setMessage,
  provider,
  library
) => {
  const chainInfo =
    NetworkList[NetworkList.findIndex((v) => v.chainId == chainId)];

  //   connector.activate(chainId);
  if (
    !connector
    // connector === walletConnectConnection.connector ||
    // connector === networkConnection.connector
  ) {
    await connector.activate(chainId);
  } else {
    // connector.activate({ chainId: 1 }).then(async () => {
    //   // Now the connector is connected to the specified network with chainId = 1
    //   console.log("Connected to network with chainId", connector.chainId);
    //   alert(connector.chainId);
    // });
    // alert(provider);
    console.log("provider: ", provider);
    console.log("connector: ", connector);
    // const change = await connector.handleChainChanged(1);
    // console.log("change: ", change);

    // library.provider
    //   .send("wallet_switchEthereumChain", [{ chainId: "0x1" }])
    //   .then(() => {
    //     try {
    //       connector.activate({ chainId: 1 });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });

    try {
      console.log("provider: ", library.provider);
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
      await library.provider.on("chainChanged", (chainId) => {
        console.log(chainId);
      });
      await library.provider.on("accountsChanged", (accounts) => {
        console.log(accounts);
      });
      console.log("success");
    } catch (switchError) {
      console.log("error : ", switchError);
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x63564c40",
                rpcUrls: ["https://api.harmony.one"],
                chainName: "Harmony Mainnet",
                nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
                blockExplorerUrls: ["https://explorer.harmony.one"],
                iconUrls: [
                  "https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png",
                ],
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }

    // alert(connector);
    // const ConnectorTest = await connector.send("eth_requestAccounts");

    // alert(ConnectorTest);
    // setMessage(connector.activate().toString());
    // alert(library.provider);

    // const Web3 = require("web3");
    // const web3 = new Web3(library.provider);
    // const currentNetwork = await web3.eth.net.getId();
    // alert(currentNetwork);
    // alert(web3.utils.toHex(25000000));

    // const addChainParameter = {
    //   chainId,
    //   chainName: chainInfo.name,
    //   rpcUrls: chainInfo.rpc,
    //   nativeCurrency: chainInfo.nativeCurrency.symbol,
    //   blockExplorerUrls: [chainInfo.explorers],
    // };
    // await connector
    //   .activate(addChainParameter)
    //   .then((result) => {
    //     alert(JSON.stringify(result));
    //   })
    //   .catch((err) => {
    //     alert(JSON.stringify(err));
    //   });
  }
};

const MobileNetworkBox = ({ networkId, setNetworkId, network }) => {
  const [networkName, setNetworkName] = useState("");
  const [networkImg, setNetworkImg] = useState("");
  const { connector, active, provider, account, chainId, library } =
    useWeb3React();
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (chainId != undefined) {
      console.log(chainId);
      setNetworkName(
        NetworkList[NetworkList.findIndex((v) => v.networkId == chainId)]?.name
      );
      setNetworkImg(
        NetworkList[NetworkList.findIndex((v) => v.networkId == chainId)]?.icon
      );
    }
  }, [chainId]);

  const editOnClick = async () => {
    const checkParams = {
      //   connector: connector,
      active: active,
      provider: library.provider,
      account: account,
      chainId: chainId,
      library: library,
    };
    console.log(checkParams);

    // alert(JSON.stringify(checkParams));
    if (connector) {
      switchChain(connector, 1, account, setMessage, provider, library);
    }

    // const Web3 = require("web3");
    // // let rpcURL = process.env.REACT_APP_GO_URL;
    // // if (chainId == 137) {
    // //   rpcURL = process.env.REACT_APP_POLYGON_URL;
    // // }

    // const web3 = new Web3(library);
    // try {
    //   //   await web3.currentProvider.request({
    //   //     method: "wallet_switchEthereumChain",
    //   //     params: [{ chainId: Web3.utils.toHex(1) }],
    //   //   });
    //   WalletConnectOnClick(() => {}, 1);
    // } catch (err) {
    //   alert(err);
    // }
  };

  return (
    <>
      <FullContainer>
        <NetworkHeader>
          <NetworkHeaderTitle>{t("sendPage02_18")}</NetworkHeaderTitle>
          <TextButton
            styles="active"
            states="default"
            size="large"
            label={t("sendPage02_19")}
            onClick={editOnClick}
          />
        </NetworkHeader>
        <NetworkBox>
          <NetworkContent>
            <NetworkIcon src={networkImg} />
            <NetworkText>{networkName}</NetworkText>
          </NetworkContent>
        </NetworkBox>
      </FullContainer>
    </>
  );
};

export default MobileNetworkBox;
