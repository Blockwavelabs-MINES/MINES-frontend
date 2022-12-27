import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import DropBox from "./Dropbox";
import MetamaskChainList from "./MetamaskChainlist";
import PlatformList from "./PlatformList";
import { MetamaskIcon, InputHelp, CopyIconGray } from "../../../assets/icons";
import { Tooltip } from "../../../components/card";
import { ContainedButton } from "../../../components/button";
import { ConfirmModal } from "../../../components/modal";
import { TimerImage } from "../../../assets/images";

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
  color: ${palette.grey_2}
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

const CopyBox = styled.div`
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

const convertDateFormat = (dateString) => {
  const toTimestamp = Date.parse(dateString);
  console.log(toTimestamp);
  const convertedDate =
    pad(new Date(toTimestamp).getFullYear().toString()) +
    "년 " +
    pad(new Date(toTimestamp).getUTCMonth() + 1) +
    "월 " +
    pad(new Date(toTimestamp).getUTCDate()) +
    "일 " +
    pad(new Date(toTimestamp).getUTCHours()) +
    ":" +
    pad(new Date(toTimestamp).getUTCMinutes());
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

  const TooltipText = (
    <TooltipStyle>
      수령은 전송일로부터 3일 내에 해당 소셜계정으로 인증하면 수령할 수 있으며,
      기한 내 미수령시 반환됩니다.
      <br />
      <br />
      미수령으로 인한 반환시에는 보낸 토큰의 0.5%를 제한 토큰이 자동반환됩니다.
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

  return (
    <Container>
      <Title>송금 완료!</Title>
      <SemiTitle>받는 분께 3일 내에 송금 링크를 공유해요</SemiTitle>
      <HelpTextContainer>
        <HelpText>유의사항</HelpText>
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
          <ExpiredInfoTitle>송금 받기 유효 기간</ExpiredInfoTitle>
          <ExpiredDateBox>
            {/* <ExpiredDate>2022년 11월 24일 19:27</ExpiredDate> */}
            <ExpiredDate>{convertDateFormat(expired)}</ExpiredDate>
            <ExpiredDateText>까지</ExpiredDateText>
          </ExpiredDateBox>
        </ExpiredInfobox>
      </ExpiredCard>
      <CopyBox>
        <LinkText>3tree.io/receiveToken/{finalLink}</LinkText>
        <CopyButton onClick={copyOnClick} />
      </CopyBox>
      <ContainedButton
        type="primary"
        styles="filled"
        states="default"
        size="large"
        label="송금 완료하기"
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
              송금을 완료했어요!
              <br /> 복사한 링크는 받는 분께 전달해주세요
            </>
          }
          buttonText={"링크 복사하고 닫기"}
          subActionOnClick={subActionOnClick}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Step3;
