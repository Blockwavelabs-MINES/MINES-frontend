import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import DropBox from "./Dropbox";
import MetamaskChainList from "./MetamaskChainlist";
import PlatformList from "./PlatformList";
import { MetamaskIcon, InputHelp, CopyIconGray } from "../../../assets/icons";
import { Tooltip } from "../../../components/card";
import { ContainedButton } from "../../../components/button";
import { ConfirmModal, CopyPivot } from "../../../components/modal";
import { TimerImage } from "../../../assets/images";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
`;

const HelpText = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_4};
`;

const HelpTextContainer = styled.div`
  width: 100%;
  display: flex;
  color: ${palette.gray};
  align-items: center;
`;

const Title = styled.div`
  ${Typography.Headline1}
  margin-bottom: 14px;
`;

const SemiTitle = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
`;

const TooltipStyle = styled.div`
  ${Typography.Footer}
  color: ${palette.white};
  text-align: left;
  font-family: Montserrat;
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

const ExpiredCard = styled.div`
  width: 100%;
  min-height: 96px;
  padding: 24px 10px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  margin-top: 22px;
  margin-bottom: 22px;
  border: 1px solid ${palette.sky_3};
  background-color: ${palette.sky_4};
  align-items: center;
`;

const TimerBox = styled.img`
  width: 48px;
`;

const ExpiredInfobox = styled.div``;

const ExpiredInfoTitle = styled.div`
  ${Typography.Caption1}
  color: ${palette.grey_1};
  margin-bottom: 7px;
`;

const ExpiredDateBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ExpiredDate = styled.div`
  ${Typography.Headline2}
  color: ${palette.blue_1};
`;

const ExpiredDateText = styled.div`
  ${Typography.Subhead}
  color: ${palette.Black};
`;

const CopyBox = styled.button`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  border-radius: 18px;
  background-color: ${palette.white};
  border: 1px solid ${palette.grey_6};
  align-items: center;
  padding: 18px 16px;
  margin-bottom: 100px;
`;

const LinkText = styled.div`
  font-family: Montserrat;
  font-size: 17px;
  font-weight: 600;
  color: ${palette.Black};
  max-width: calc(100vw - 100px);
  overflow-x: scroll;
  // overflow: hidden;
  overflow: auto;
  white-space: nowrap;
`;

const CopyButton = styled.button`
  width: 20px;
  height: 20px;
  background-image: url(${CopyIconGray});
  background-color: transparent;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  border: hidden;
`;

function pad(n) {
  return n < 10 ? "0" + n : n;
}

const convertDateFormat = (dateString, a, b, c, d) => {
  const toTimestamp = Date.parse(dateString);
  console.log(toTimestamp);
  let convertedDate = "";
  if (localStorage.getItem("language") === "en") {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    convertedDate =
      a +
      pad(new Date(toTimestamp).getUTCHours()) +
      ":" +
      pad(new Date(toTimestamp).getUTCMinutes()) +
      b +
      monthNames[Number(new Date(toTimestamp).getUTCMonth())] +
      " " +
      pad(new Date(toTimestamp).getUTCDate()) +
      d +
      " " +
      pad(new Date(toTimestamp).getFullYear().toString());
  } else {
    convertedDate =
      a +
      pad(new Date(toTimestamp).getFullYear().toString()) +
      b +
      pad(new Date(toTimestamp).getUTCMonth() + 1) +
      c +
      pad(new Date(toTimestamp).getUTCDate()) +
      d +
      pad(new Date(toTimestamp).getUTCHours()) +
      ":" +
      pad(new Date(toTimestamp).getUTCMinutes());
  }
  // ":" +
  // pad(new Date(toTimestamp).getUTCSeconds());
  return convertedDate;
};

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

const Step3 = ({
  setAmount,
  setToken,
  setCurrency,
  currency,
  amount,
  token,
  networkId,
  createdLink,
  expired,
  finalLink,
}) => {
  const [notiClick, setNotiClick] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [copyPivotVisible, setCopyPivotVisible] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);

  const myRef = useRef(null);
  const { t } = useTranslation();

  const TooltipText = (
    <TooltipStyle>
      {t("sendPage03_2")}
      <br />
      <br />
      {t("sendPage03_3")}
    </TooltipStyle>
  );

  const notiOnClose = () => {
    setNotiClick(false);
  };

  const copyOnClick = () => {
    const handleCopyClipBoard = async (text) => {
      var textarea = document.createElement("textarea");
      textarea.value = text; // 복사할 메시지
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 9999); // For IOS
      document.execCommand("copy");
      document.body.removeChild(textarea);

      if (myRef.current) {
        let tmpX = myRef.current.getBoundingClientRect().top;
        let tmpY = myRef.current.getBoundingClientRect().left;
        console.log(tmpX);
        console.log(tmpY);
        setClickX(tmpX);
        setClickY(tmpY);
      }
      setCopyPivotVisible(true);
    };

    handleCopyClipBoard(`3tree.io/receiveToken/${finalLink}`);
  };

  const closeConfirmModal = () => {
    setCompleteModalVisible(false);
  };

  const subActionOnClick = () => {
    copyOnClick();
    window.location.href = "/";
  };

  const copyOnClose = () => {
    setCopyPivotVisible(false);
  };

  return (
    <Container>
      <Title>{t("sendPage03Success1")}</Title>
      <SemiTitle>{t("sendPage03Success2")}</SemiTitle>
      <HelpTextContainer>
        <HelpText>{t("sendPage03_1")}</HelpText>
        <NoticeIcon onClick={() => setNotiClick(!notiClick)}>
          {notiClick ? (
            <Tooltip
              text={TooltipText}
              visible={notiClick}
              closable={true}
              maskClosable={true}
              onClose={notiOnClose}
            />
          ) : (
            <></>
          )}
        </NoticeIcon>
      </HelpTextContainer>
      <ExpiredCard>
        <TimerBox src={TimerImage} />
        <ExpiredInfobox>
          <ExpiredInfoTitle>{t("sendPage03_4")}</ExpiredInfoTitle>
          <ExpiredDateBox>
            {/* <ExpiredDate>2022년 11월 24일 19:27</ExpiredDate> */}
            <ExpiredDate>
              {convertDateFormat(
                expired,
                t("receiveTokenPage5"),
                t("receiveTokenPage6"),
                t("receiveTokenPage7"),
                t("receiveTokenPage8")
              )}
            </ExpiredDate>
            <ExpiredDateText>{t("receiveTokenPage9")}</ExpiredDateText>
          </ExpiredDateBox>
        </ExpiredInfobox>
      </ExpiredCard>
      <div ref={myRef}>
        <CopyBox onClick={copyOnClick}>
          <LinkText>3tree.io/receiveToken/{finalLink}</LinkText>
          <CopyButton />
        </CopyBox>
      </div>
      {copyPivotVisible ? (
        <CopyPivot
          visible={copyPivotVisible}
          closable={true}
          maskClosable={true}
          onClose={copyOnClose}
          label={t("createLinkDone5")}
          type={"up"}
          x={`calc(${clickX}px - 70px)`}
          y={"calc(50% - 90px)"}
        />
      ) : (
        <></>
      )}
      <ContainedButton
        type="primary"
        styles="filled"
        states="default"
        size="large"
        label={t("sendPage03_11")}
        onClick={() => setCompleteModalVisible(true)}
      />
      {completeModalVisible ? (
        <ConfirmModal
          visible={completeModalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeConfirmModal}
          text={
            <>
              {t("sendPage03_12")}
              <br /> {t("sendPage03_13")}
            </>
          }
          buttonText={t("sendPage03_14")}
          subActionOnClick={subActionOnClick}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Step3;
