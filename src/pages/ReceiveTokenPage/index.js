import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SendTokenHeader, LoginHeader } from "../../components/header";
import { Tooltip } from "../../components/card";
import { ContainedButton } from "../../components/button";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";
import { useLocation } from "react-router-dom";
import { MetamaskIcon, InfoIcon } from "../../assets/icons";
import { PigImage, TimerImage, CloudImage } from "../../assets/images";
import { LoginModal } from "../../components/modal";
import { getUserInfo, getUserInfoByIndex } from "../../utils/api/auth";
import { SelectWallet } from "./components";
import { getTrxsLinkInfo } from "../../utils/api/trxs";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding: auto 50px;
  // padding-top: 75px;
`;

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
`;

const ImageContainer = styled.img`
  margin-top: 163px;
  margin-bottom: 30px;
  width: 127px;
`;

const InfoLine = styled.div`
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
`;

const InfoText = styled.div`
  ${Typography.Headline1}
  margin-right: 9.7px;
`;

const BodyText = styled.div`
  ${Typography.Body}
  color: ${palette.grey_1};
`;

const ExpiredCard = styled.div`
  width: 100%;
  min-height: 96px;
  padding: 24px 10px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  margin-top: 42px;
  margin-bottom: 10px;
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

const NoticeBox = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 29px;
`;

const NoticeText = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_4};
`;

const NoticeIcon = styled.button`
  width: 16px;
  height: 16px;
  background-image: url(${InfoIcon});
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  border: hidden;
  background-color: transparent;
  position: relative;
`;

const TooltipStyle = styled.div`
  ${Typography.Footer}
  color: ${palette.white};
  text-align: left;
  font-family: Montserrat;
`;

const ReceiveTokenPage = () => {
  const [userInfo, setUserInfo] = useState();
  const [stepStatus, setStepStatus] = useState(1);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [linkInfo, setLinkInfo] = useState({});
  const [senderUser, setSenderUser] = useState("");
  const [notiClick, setNotiClick] = useState(false);
  const [loginDone, setLoginDone] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const TooltipText = (
    <TooltipStyle>
      수령은 전송일로부터 3일 내에 해당 소셜계정으로 인증하면 수령할 수 있으며,
      기한 내 미수령시 반환됩니다.
      <br />
      <br />
      미수령으로 인한 반환시에는 보낸 토큰의 0.5%를 제한 토큰이 자동반환됩니다.
    </TooltipStyle>
  );

  useEffect(() => {
    (async () => {
      const pathname = window.location.pathname.split("/");
      const trxsLink = pathname[pathname.length - 1];
      const getTrxsLinkInfoResult = await getTrxsLinkInfo(trxsLink).then(
        async (data) => {
          console.log(data);
          if (data == 0) {
            setIsValid(false);
          } else if (!data._valid) {
            console.log(data._valid);
            setIsValid(false);
          } else {
            const getUserInfoByIndexResult = await getUserInfoByIndex(
              data.sender_user_index
            ).then((res) => {
              setSenderUser(res.user.user_id);
            });
            setLinkInfo(data);
          }
        }
      );
    })();
  }, []);

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      setUserInfo(globalUserInfo);
    }
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    if (!loginModalVisible) {
      console.log("auto");
      document.body.style.overflow = "auto";
    }
  }, [loginModalVisible]);

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const leftOnClick = () => {
    if (stepStatus == 1) {
      window.location.href = "/";
    } else {
      setStepStatus(stepStatus - 1);
    }
  };

  const headerRightOnClick = () => {
    setCancelModalOpen(true);
    console.log(cancelModalOpen);
  };

  const notiOnClose = () => {
    setNotiClick(false);
  };

  return (
    <>
      {" "}
      <FullContainer>
        {loginDone ? (
          <SelectWallet linkInfo={linkInfo} />
        ) : (
          <>
            <LoginHeader onVisible={setLoginModalVisible} />
            {loginModalVisible ? (
              <LoginModal
                visible={loginModalVisible}
                closable={true}
                maskClosable={true}
                onClose={closeLoginModal}
                type="receive"
                setStatus={setLoginDone}
              />
            ) : (
              <></>
            )}
            <ContentContainer>
              {isValid ? (
                <>
                  <ImageContainer src={PigImage} />
                  <InfoLine>
                    <InfoText>@{senderUser}</InfoText>
                    <BodyText>님이</BodyText>
                  </InfoLine>
                  <InfoLine>
                    <InfoText>
                      {linkInfo?.token_amount} {linkInfo?.token_udenom}
                    </InfoText>
                    <BodyText>를 보냈어요!</BodyText>
                  </InfoLine>
                  <ExpiredCard>
                    <TimerBox src={TimerImage} />
                    <ExpiredInfobox>
                      <ExpiredInfoTitle>송금 받기 유효 기간</ExpiredInfoTitle>
                      <ExpiredDateBox>
                        <ExpiredDate>{linkInfo?.expired_at}</ExpiredDate>
                        <ExpiredDateText>까지</ExpiredDateText>
                      </ExpiredDateBox>
                    </ExpiredInfobox>
                  </ExpiredCard>
                  <NoticeBox>
                    <NoticeText>유의사항</NoticeText>
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
                  </NoticeBox>
                  <ContainedButton
                    type="primary"
                    styles="filled"
                    states="default"
                    size="large"
                    label="로그인해서 받기"
                    onClick={() => {
                      setLoginModalVisible(true);
                    }}
                  />{" "}
                </>
              ) : (
                <>
                  <ImageContainer src={CloudImage} />
                  <InfoLine>
                    <InfoText>유효하지 않은 링크입니다.</InfoText>
                  </InfoLine>
                </>
              )}
            </ContentContainer>
          </>
        )}
      </FullContainer>
    </>
  );
};

export default ReceiveTokenPage;
