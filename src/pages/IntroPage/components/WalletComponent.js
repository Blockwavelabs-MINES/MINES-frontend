import { EmptyWallet, MetamaskIcon } from "assets/icons";
import { EditableCard, EmptyCard } from "components/card";
import { CopyPivot } from "components/modal";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const FullContainer = styled.div`
  width: 100%;
  padding: 0px 16px 0px 16px;
`;

const TitleContainer = styled.div`
`;

const ListContainer = styled.div`
  width: 100%;
  padding-top: 16px;
  display: grid;
  gap: 16px;
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

const WalletComponent = ({ userWalletList, profileDecorate }) => {
  const [walletList, setWalletList] = useState(userWalletList);
  const [copyOn, setCopyOn] = useState(false);
  const [copyIdx, setCopyIdx] = useState(-1);
  const [clickX, setClickX] = useState(0);

  const myRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (myRef.current[copyIdx] && copyIdx > -1) {
      let tmpX = myRef.current[copyIdx].getBoundingClientRect().top;
      setClickX(tmpX);
    }
  }, [copyIdx]);

  useEffect(() => {
    setWalletList(userWalletList);
  }, [userWalletList]);

  const walletOnClick = (walletAddress, idx) => {
    setCopyOn(true);
    setCopyIdx(idx);

    const handleCopyClipBoard = async (text) => {
      const textArea = document.createElement("textarea");
      textArea.value = text; // 복사할 메시지
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 9999); // For IOS
      document.execCommand("copy");
      document.body.removeChild(textArea);
    };

    handleCopyClipBoard(walletAddress);
  };

  const copyOnClose = () => {
    setCopyOn(false);
    setCopyIdx(-1);
  };

  return (
    <FullContainer>
      <TitleContainer ref={myRef}>
      </TitleContainer>
      {walletList?.length === 0 ? (
        <EmptyCard icon={EmptyWallet} text={t("selectWalletPage3_3")} />
      ) : (
        <ListContainer>
          {walletList?.map((wallet, idx) => (
            <>
              {idx === copyIdx && copyOn && (
                <CopyPivot
                  visible={copyOn}
                  closable={true}
                  maskClosable={true}
                  onClose={copyOnClose}
                  label={t("profilePage5")}
                  type={"up"}
                  x={`calc(${clickX}px - 70px)`}
                  y={"calc(50% - 90px)"}
                />
              )}
              <div ref={(element) => (myRef.current[idx] = element)}>
                <EditableCard
                  label={walletConvert(wallet.walletAddress)}
                  icon={MetamaskIcon}
                  onClick={() => walletOnClick(wallet.walletAddress, idx)}
                  style={{
                    backgroundColor: profileDecorate.buttonColor,
                    color: profileDecorate.buttonFontColor,
                  }}
                />
              </div>
            </>
          ))}
        </ListContainer>
      )}
    </FullContainer>
  );
};

export default WalletComponent;
