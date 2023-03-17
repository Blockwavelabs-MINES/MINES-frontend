import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SendTokenHeader, LoginHeader } from "../../components/header";
import { Tooltip, LoadingComponent } from "../../components/card";
import { ContainedButton } from "../../components/button";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";
import { useLocation } from "react-router-dom";
import { MetamaskIcon, InfoIcon } from "../../assets/icons";
import {
  PigImage,
  TimerImage,
  CloudImage,
  CheckImage,
} from "../../assets/images";
import { LoginModal } from "../../components/modal";
import { getUserInfoAndProfileDeco } from "../../utils/api/auth";
import { SelectWallet } from "./components";
import { getTrxsLinkInfo } from "../../utils/api/trxs";
import { useTranslation } from "react-i18next";

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

const TextLine = styled.div`
  ${Typography.Headline1}
  text-align: center;
  margin-bottom: 14px;
  font-family: Montserrat;
`;

const CheckTxTitle = styled.div`
  ${Typography.Subhead}
  color: ${palette.grey_1};
  text-align: center;
  margin-bottom: 80px;
`;

const ComplainLink = styled.a`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: ${palette.grey_4};
`;

function pad(n) {
  return n < 10 ? "0" + n : n;
}

const convertDateFormat = (dateString, a, b, c, d) => {
  const toTimestamp = Date.parse(dateString);
  console.log(toTimestamp);
  let convertedDate = "";
  if (JSON.parse(localStorage.getItem("language"))?.lang == "en") {
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
  const [isExpired, setIsExpired] = useState(false);
  const { t } = useTranslation();

  const TooltipText = (
    <TooltipStyle>
      {t("previewPage10")}
      <br />
      <br />
      {t("previewPage11")}
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
            let tmpData = data;
            tmpData.token_amount = convert(data.token_amount);
            console.log(tmpData);
            setLinkInfo(tmpData);
            if (Date.parse(new Date()) > Date.parse(data.expired_at)) {
              setIsExpired(true);
            }
          } else {
            const getUserInfoByIndexResult = await getUserInfoAndProfileDeco(
              data.sender_user_index
            ).then((res) => {
              setSenderUser(res.user.user_id);
            });
            console.log(data);
            let tmpData = data;
            tmpData.token_amount = convert(data.token_amount);
            console.log(tmpData);
            setLinkInfo(tmpData);
            //  + 32400000는 한국시간 때문!
            if (
              Date.parse(new Date()) + 32400000 >
              Date.parse(data.expired_at)
            ) {
              setIsExpired(true);
              setIsValid(false);
            }
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

  console.log(linkInfo);

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
                    <BodyText>{t("receiveTokenPage2")}</BodyText>
                  </InfoLine>
                  <InfoLine>
                    <InfoText>
                      {linkInfo?.token_amount} {linkInfo?.token_udenom}
                    </InfoText>
                    <BodyText>{t("receiveTokenPage3")}</BodyText>
                  </InfoLine>
                  <ExpiredCard>
                    <TimerBox src={TimerImage} />
                    <ExpiredInfobox>
                      <ExpiredInfoTitle>
                        {t("receiveTokenPage4")}
                      </ExpiredInfoTitle>
                      <ExpiredDateBox>
                        <ExpiredDate>
                          {convertDateFormat(
                            linkInfo?.expired_at,
                            t("receiveTokenPage5"),
                            t("receiveTokenPage6"),
                            t("receiveTokenPage7"),
                            t("receiveTokenPage8")
                          )}
                        </ExpiredDate>
                        <ExpiredDateText>
                          {t("receiveTokenPage9")}
                        </ExpiredDateText>
                      </ExpiredDateBox>
                    </ExpiredInfobox>
                  </ExpiredCard>
                  <NoticeBox>
                    <NoticeText>{t("receiveTokenPage10")}</NoticeText>
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
                    label={t("receiveTokenPage13")}
                    onClick={() => {
                      setLoginModalVisible(true);
                    }}
                  />{" "}
                </>
              ) : (
                <>
                  {linkInfo._expired != undefined ? (
                    <>
                      {isExpired ? (
                        <>
                          <ImageContainer src={CloudImage} />
                          <TextLine>{t("receiveTokenTimeOver1")}</TextLine>
                          <CheckTxTitle>
                            @{senderUser}
                            {t("receiveTokenTimeOver2")}
                          </CheckTxTitle>
                        </>
                      ) : (
                        <>
                          <ImageContainer src={CheckImage} />
                          <TextLine>
                            {t("receiveTokenAlreadyReceived1")}
                          </TextLine>
                          <CheckTxTitle>
                            {t("receiveTokenAlreadyReceived2")}
                          </CheckTxTitle>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <ImageContainer src={CloudImage} />
                      <TextLine>{t("receiveTokenUnknownLink1")}</TextLine>
                      <CheckTxTitle>
                        {t("receiveTokenUnknownLink2")}
                      </CheckTxTitle>
                    </>
                  )}
                  <ComplainLink
                    href="https://forms.gle/4CGoKQAWzJVG2dd69"
                    target="_blank"
                  >
                    {t("receiveTokenUnknownLink3")}
                  </ComplainLink>
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
