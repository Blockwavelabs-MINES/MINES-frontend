import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { EmptyCard, EditableCard } from "../../../components/card";
import { EmptyWallet, MetamaskIcon } from "../../../assets/icons";
import { useTranslation } from "react-i18next";

const FullContainer = styled.div`
  width: 100%;
  padding: 20px;
  padding-bottom: 60px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TItleText = styled.div`
  text-align: center;
  ${Typography.Headline1}
  color: ${palette.Black};
`;

const ListContainer = styled.div`
  width: 100%;
  padding-top: 22px;
  display: grid;
  gap: 20px;
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

function isMobileDevice() {
  return (
    ("ontouchstart" in window || "onmsgesturechange" in window) &&
    !window.ethereum
  );
}

const WalletComponent = ({ userWalletList }) => {
  const [walletList, setWalletList] = useState(userWalletList);
  const [copyPivotVisible, setCopyPivotVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setWalletList(userWalletList);
  }, [userWalletList]);

  const walletOnClick = (walletAddress) => {
    const handleCopyClipBoard = async (text) => {
      var textarea = document.createElement("textarea");
      textarea.value = text; // 복사할 메시지
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 9999); // For IOS
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert(t("createLinkDone5"));
    };

    handleCopyClipBoard(walletAddress);
  };

  return (
    <FullContainer>
      <TitleContainer>
        <TItleText>{t("profilePage2")}</TItleText>
      </TitleContainer>
      {walletList?.length == 0 ? (
        <EmptyCard icon={EmptyWallet} text={t("selectWalletPage3_3")} />
      ) : (
        <ListContainer>
          {walletList?.map((wallet, idx) => (
            <EditableCard
              label={walletConvert(wallet.wallet_address)}
              // icon={wallet.icon}
              icon={MetamaskIcon}
              onClick={() => walletOnClick(wallet.wallet_address)}
            />
          ))}
        </ListContainer>
      )}
    </FullContainer>
  );
};

export default WalletComponent;
