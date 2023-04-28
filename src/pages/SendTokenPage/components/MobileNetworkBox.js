import { useWeb3React } from "@web3-react/core";
import { InputHelp, MetamaskIcon } from "assets/icons";
import { TextButton } from "components/button";
import { Tooltip } from "components/card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import { NetworkSwitchModal } from ".";
import NetworkList from "./NetworkList";

const FullContainer = styled.div`
  width: 100%;
  margin-top: 62px;
`;

const NetworkHeader = styled.div`
  width: 100%;
  display: space-between;
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
  align-items: center;
  padding: 16px;
  background-color: ${palette.sky_4};
  border: 1px solid ${palette.sky_3};
  border-radius: 16px;
  margin: 10px 0px;
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

const ConnectStatus = styled.div`
  display: flex;
  align-items: center;
`;

const ConnectStatusText = styled.div`
  font-family: Montserrat;
  font-size: 11px;
  font-weight: 400;
  color: ${palette.green_1};
`;

const ConnectStatusCircle = styled.div`
  margin: 5px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${palette.green_1};
`;

const HelpTextContainer = styled.div`
  width: 100%;
  display: flex;
  color: ${palette.gray};
  margin-bottom: 32px;
  align-items: center;
`;

const HelpText = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_4};
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

const TooltipStyle = styled.div`
  ${Typography.Footer}
  color: ${palette.white};
  text-align: left;
  font-family: Montserrat;
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

export const switchChain = async (connector, library, newChainId) => {
  const chainInfo =
    NetworkList[NetworkList.findIndex((v) => v.chainId == newChainId)];

  if (!connector) {
  } else {
    await library.provider.on("chainChanged", (chainId) => {
      console.log(chainId);
    });
    await library.provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });

    try {
      console.log("provider: ", library.provider);
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x" + newChainId?.toString(16),
          },
        ],
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
                chainId: "0x" + chainInfo?.chainId?.toString(16),
                rpcUrls: chainInfo?.rpc,
                chainName: chainInfo?.name,
                nativeCurrency: chainInfo?.nativeCurrency,
                blockExplorerUrls: chainInfo?.explorers,
                iconUrls: [chainInfo?.icon],
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
};

const MobileNetworkBox = ({ setNetworkId }) => {
  const [networkName, setNetworkName] = useState("");
  const [networkImg, setNetworkImg] = useState("");
  const { connector, active, provider, account, chainId, library } =
    useWeb3React();
  const [iconClicked, setIconClicked] = useState(false);
  const [iconHovering, setIconHovering] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [newNetworkId, setNewNetworkId] = useState(chainId);

  const { t } = useTranslation();
  const TooltipText = (
    <TooltipStyle>
      {t("sendpage02_17")}
      <br />
      {t("sendpage02_15")}
    </TooltipStyle>
  );

  useEffect(() => {
    if (chainId && chainId != newNetworkId) {
      switchChain(connector, account, provider, library, newNetworkId);
    }
  }, [newNetworkId]);

  useEffect(() => {
    if (chainId != undefined) {
      setNetworkId(chainId);
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
      active: active,
      provider: library.provider,
      account: account,
      chainId: chainId,
      library: library,
    };

    if (connector) {
      setNetworkOpen(true);
    }
  };

  const notiOnClose = () => {
    setIconClicked(false);
  };

  return (
    <>
      <>
        {networkOpen && NetworkList && (
          <NetworkSwitchModal
            visible={networkOpen}
            closable={true}
            maskClosable={true}
            onClose={() => setNetworkOpen(false)}
            networkList={NetworkList}
            networkId={chainId}
            switchChain={switchChain}
            setNewNetworkId={setNewNetworkId}
          />
        )}
      </>
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
          <ConnectStatus>
            <ConnectStatusText>{t("sendPage02_20")}</ConnectStatusText>
            <ConnectStatusCircle />
          </ConnectStatus>
        </NetworkBox>
        <HelpTextContainer>
          <HelpText>{t("sendpage02_14")}</HelpText>
          <NoticeIcon
            onClick={() => setIconClicked(!iconClicked)}
            onMouseEnter={() => {
              setIconHovering(true);
            }}
            onMouseLeave={() => {
              setIconHovering(false);
            }}
          >
            {(iconClicked || iconHovering) && (
              <Tooltip
                text={TooltipText}
                closable={true}
                maskClosable={true}
                onClose={notiOnClose}
              />
            )}
          </NoticeIcon>
        </HelpTextContainer>
        <NetworkHeader>
          <NetworkHeaderTitle>{t("sendPage02_21")}</NetworkHeaderTitle>
        </NetworkHeader>
        <NetworkBox
          style={{
            backgroundColor: palette.white,
            border: `1px solid ${palette.grey_7}`,
            marginBottom: "32px",
          }}
        >
          <NetworkContent>
            <NetworkIcon src={MetamaskIcon} />
            <NetworkText>{walletConvert(account)}</NetworkText>
          </NetworkContent>
        </NetworkBox>
      </FullContainer>
    </>
  );
};

export default MobileNetworkBox;
