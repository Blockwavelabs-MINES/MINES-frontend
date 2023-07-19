import { InfoIcon } from "assets/icons";
import { CheckImage, CloudImage, PigImage, TimerImage } from "assets/images";
import { ContainedButton } from "components/button";
import { Tooltip } from "components/card";
import { LoginHeader } from "components/header";
import { DeleteModal } from "components/modal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getUserInfo, getUserInfoAndProfileDeco } from "utils/api/auth";
import { getTrxsLinkInfo } from "utils/api/trxs";
import { getSocialConnectList } from "utils/api/twitter";
import {
  loginDoneState,
  loginModalVisibleState,
  loginState,
} from "utils/atoms/login";
import { receiveLinkState } from "utils/atoms/twitter";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import { SelectWallet } from "./components";
import { getWallet } from "utils/api/wallets";
import setConvertedData from "utils/functions/setConvertedData";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: auto 50px;
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

const convertDateFormat = (date, a, b, c, d) => {
  let dateString = date.replaceAll("-", "").replaceAll("T", "");
  let monthNames = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };
  let convertedDate;
  if (localStorage.getItem("language") === "en") {
    convertedDate =
      a +
      " " +
      dateString.slice(8, 13) +
      " " +
      b +
      " " +
      monthNames[dateString.slice(4, 6)] +
      " " +
      dateString.slice(6, 8) +
      d +
      " " +
      dateString.slice(0, 4);
  } else {
    convertedDate =
      dateString.slice(0, 4) +
      b +
      " " +
      dateString.slice(4, 6) +
      c +
      " " +
      dateString.slice(6, 8) +
      d +
      " " +
      dateString.slice(8, 13);
  }

  return convertedDate;
};

const ReceiveTokenPage = () => {
  const [linkInfo, setLinkInfo] = useState(null);
  const [senderUser, setSenderUser] = useState("");
  const [iconClicked, setIconClicked] = useState(false);
  const [iconHovering, setIconHovering] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [socialList, setSocialList] = useState(null);
  const isLoggedIn = useRecoilValue(loginState);
  const loginDone = useRecoilValue(loginDoneState);
  const setReceiveLink = useSetRecoilState(receiveLinkState);

  const [loginModalVisible, setLoginModalVisible] = useRecoilState(
    loginModalVisibleState
  );
  const [isWrongUser, setIsWrongUser] = useState(false);

  const { t } = useTranslation();

  const TooltipText = (
    <TooltipStyle>
      {t("previewPage10")}
      <br />
      <br />
      {t("previewPage11")}
    </TooltipStyle>
  );

  const pathname = window.location.pathname.split("/");
  const trxsLink = pathname[pathname.length - 1];

  useEffect(() => {
    getTrxsLinkInfo(trxsLink).then(async (trxsData) => {
      let convertedData = trxsData;
      setSenderUser(trxsData.senderUsername);
      if (trxsData.isValid && isLoggedIn) {
        await getUserInfo().then(async (userData) => {
          setUserInfo(userData);
          getWallet(userData.userId).then((walletData) => {
            setWalletData(walletData);
          })
        });
      }

      if (isLoggedIn) {
        getSocialConnectList().then((socialList) => {
          setSocialList(socialList);
          console.log(socialList?.data[0]?.username);
          console.log(convertedData?.receiverUsername);
          if (socialList?.data.length === 0) {
            window.location.href = "/accountLinking";
          } else {
            socialList?.data[0]?.username !== convertedData?.receiverUsername
              ? setIsWrongUser(true)
              : setIsWrongUser(false);
          }
        });
      }

      convertedData.tokenAmount = setConvertedData(trxsData.tokenAmount);
      setLinkInfo(convertedData);
    });
  }, [isLoggedIn, loginDone]);

  useEffect(() => {
    document.body.style.overflow = "auto";
    setReceiveLink(trxsLink);
  }, []);

  useEffect(() => {
    if (!loginModalVisible) {
      document.body.style.overflow = "auto";
    }
  }, [loginModalVisible]);

  return (
    <>
      <FullContainer>
        {(loginDone || isLoggedIn) &&
        linkInfo?.isValid &&
        !linkInfo?.isExpired ? (
          <>
            <DeleteModal
              visible={isWrongUser}
              closable={false}
              maskClosable={true}
              onClose={() => {
                window.location.href = "/";
              }}
              text={
                <>
                  {t("receiveWrongUserModal1")}
                  <br />
                  {t("receiveWrongUserModal2")}
                </>
              }
              setRealDelete={() => {
                window.location.href = "/";
              }}
              buttonText={t("receiveWrongUserModal3")}
              oneButton={true}
              buttonColor="blue"
            />
            <SelectWallet
              linkInfo={linkInfo}
              userInfo={userInfo}
              walletData={walletData}
            />
          </>
        ) : (
          <>
            <LoginHeader />
            <ContentContainer>
              {linkInfo?.isValid && !isLoggedIn ? (
                <>
                  <ImageContainer src={PigImage} />
                  <InfoLine>
                    <InfoText>@{senderUser}</InfoText>
                    <BodyText>{t("receiveTokenPage2")}</BodyText>
                  </InfoLine>
                  <InfoLine>
                    <InfoText>
                      {linkInfo?.tokenAmount} {linkInfo?.tokenUdenom}
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
                            linkInfo?.expiredAt,
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
                          onClose={() => setIconClicked(false)}
                        />
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
                  />
                </>
              ) : (
                <>
                  {linkInfo ? (
                    <>
                      {/* 유효하지만 만료 됐음 */}
                      {linkInfo.isExpired && linkInfo.isValid ? (
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
