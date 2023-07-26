import { ChevronRight, GreenCheck, MetamaskIcon } from "assets/icons";
import { CompasImage } from "assets/images";
import animation from "assets/lottie/check-lottie.json";
import { EditableCard } from "components/card";
import { SendTokenHeader } from "components/header";
import { CopyPivot, NoticeModal } from "components/modal";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie-player";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { getTrxsLinkInfo } from "utils/api/trxs";
import { receiveTrxHashState } from "utils/atoms/trxs";
import { twitterLinkState } from "utils/atoms/twitter";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
`;

const LottieContainer = styled.div`
  width: 100px;
  margin: 0px auto;
  padding-top: 140px;
  margin-bottom: 10px;
`;

const WalletBox = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

const TextLine = styled.div`
  ${Typography.Headline1}
  text-align: center;
  margin-bottom: 36px;
  font-family: Montserrat;
`;

const CheckBox = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(-50%, -50%);
`;

const CheckTxTitle = styled.div`
  ${Typography.Headline2}
  color: ${palette.grey_2};
`;

const TxHashCard = styled.button`
  width: 100%;
  min-height: 96px;
  padding: 24px 10px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  margin-top: 12px;
  margin-bottom: 57px;
  border: 1px solid ${palette.sky_3};
  background-color: ${palette.sky_4};
  align-items: center;
  position: relative;
`;

const TimerBox = styled.img`
  width: 46px;
`;

const TxHashInfobox = styled.div``;

const TxHashInfoTitle = styled.div`
  ${Typography.Caption1}
  color: ${palette.grey_1};
`;

const TxHashAddressBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TxHashAddress = styled.div`
  ${Typography.Headline2}
  color: ${palette.Black};
  text-decoration: underline;
`;

const RightArrow = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0%, -50%);
`;

const ComplainLink = styled.a`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: ${palette.grey_4};
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

const ReceiveComplete = ({ walletList, select }) => {
  const { t } = useTranslation();
  const [receiveInfo, setReceiveInfo] = useState(null);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [copyPivotVisible, setCopyPivotVisible] = useState(false);
  const [clickX, setClickX] = useState(0);
  const receiveTrxHash = useRecoilValue(receiveTrxHashState);
  const [twitterLink, setTwitterLink] = useRecoilState(twitterLinkState);

  const textRef = useRef(null);

  const txHashExplorerOnClick = () => {
    if (Number(receiveInfo.networkId) == 5) {
      window.open(`https://goerli.etherscan.io/tx/${receiveTrxHash}`);
    } else if (Number(receiveInfo.networkId) == 137) {
      window.open(`https://polygonscan.com/tx/${receiveTrxHash}`);
    }
  };

  useEffect(() => {
    const pathname = window.location.pathname.split("/");
    const trxsLink = pathname[pathname.length - 1];
    getTrxsLinkInfo(trxsLink).then((data) => {
      setReceiveInfo(data);
    });
  }, []);

  useEffect(() => {
    setIsNoticeModalOpen(true);
    setTimeout(() => {
      setIsNoticeModalOpen(false);
      setTwitterLink(null);
    }, 4000);
  }, []);

  function convert(n) {
    if (n) {
      var sign = +n < 0 ? "-" : "",
        toStr = n.toString();
      if (!/e/i.test(toStr)) {
        return n;
      }
      var [lead, decimal, pow] = n
        .toString()
        .replace(/^-/, "")
        .replace(/^([0-9]+)(e.*)/, "$1.$2")
        .split(/e|\./);
      return +pow < 0
        ? sign +
            "0." +
            "0".repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) +
            lead +
            decimal
        : sign +
            lead +
            (+pow >= decimal.length
              ? decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))
              : decimal.slice(0, +pow) + "." + decimal.slice(+pow));
    }
  }

  const hashOnClick = () => {

    const onClick = async (text) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    
      if (textRef.current) {
        let tmpX = textRef.current.getBoundingClientRect().top;
        setClickX(tmpX);
      }

      setCopyPivotVisible(true);
    }
    
    onClick(receiveTrxHash);
  }

  const copyOnClose = () => {
    setCopyPivotVisible(false);
  };

  const leftOnClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      <SendTokenHeader
        title={t("receiveTokenPage1")}
        iconHome
        leftOnClick={leftOnClick}
      />
      <ContentContainer>
        <LottieContainer>
          <Lottie animationData={animation} loop={false} play />
        </LottieContainer>
        <TextLine>
          {convert(receiveInfo?.tokenAmount)} {receiveInfo?.tokenUdenom}
          <br />
          {t("receiveTokenComplete2")}
        </TextLine>
        <WalletBox>
          <CheckBox src={GreenCheck} />
          <EditableCard
            label={walletConvert(walletList[select].walletAddress)}
            isEdit={false}
            isTrash={false}
            icon={MetamaskIcon}
          />
        </WalletBox>
        <CheckTxTitle>{t("receiveTokenComplete3")}</CheckTxTitle>
        <div ref={textRef}>
          <TxHashCard onClick={hashOnClick}>
            <RightArrow src={ChevronRight} />
            <TimerBox src={CompasImage} />
            <TxHashInfobox>
              <TxHashInfoTitle>{t("receiveTokenComplete4")}</TxHashInfoTitle>
              <TxHashAddressBox>
                <TxHashAddress>{walletConvert(receiveTrxHash)}</TxHashAddress>
              </TxHashAddressBox>
            </TxHashInfobox>
          </TxHashCard>
        </div>
        {copyPivotVisible && (
          <CopyPivot
            visible={copyPivotVisible}
            closable={true}
            maskClosable={true}
            onClose={copyOnClose}
            label={t("sendPage03_10")}
            type={"up"}
            x={`calc(${clickX}px - 70px)`}
            y={"calc(50% - 90px)"}
          />
        )}
        <ComplainLink
          href="https://forms.gle/4CGoKQAWzJVG2dd69"
          target="_blank"
        >
          {t("receiveTokenComplete5")}
        </ComplainLink>
        {twitterLink && (
          <NoticeModal
            visible={isNoticeModalOpen}
            text={t("noticeModal6")}
            linkText={t("noticeModal7")}
            onClickEvent={() => {
              window.location.href = twitterLink;
            }}
          />
        )}
      </ContentContainer>
    </>
  );
};

export default ReceiveComplete;
