import { MainImage1, MainImage2, MainImage3 } from "assets/images";
import { ContainedButton } from "components/button";
import { LoginHeader } from "components/header";
import { SingleModal } from "components/modal";
import CreateLinkPage from "pages/CreateLinkPage";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  loginModalVisibleState,
  loginState,
  signupState,
} from "utils/atoms/login";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

SwiperCore.use([Navigation, Pagination]);

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const IntroTextBox = styled.div`
  width: 90%;
  margin: 0px auto;
  margin-top: 50px;
`;

const FirstIntro = styled.div`
  ${Typography.Headline1}
  color: ${palette.Black};
  line-height: 33.35px;
`;

const SecondIntro = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
  line-height: 23.8px;
  margin-top: 14px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 88px;
  padding: 16px 20px;
  position: fixed;
  bottom: 0px;
  display: flex;
  gap: 10px;
  z-index: 100;
  backdrop-filter: blur(15px);
`;

const MainImageBanner = styled.img`
  width: 90%;
  margin-top: 30px;
  margin-bottom: 40px;
`;

const BannerBottom = styled.div`
  height: 160px;
`;

const IntroPage = () => {
  const [loginAlertModalVisible, setLoginAlertModalVisible] = useState(false);
  const [isSignup, setIsSignup] = useRecoilState(signupState);
  const isLoggedIn = useRecoilValue(loginState);
  const setLoginModalVisible = useSetRecoilState(loginModalVisibleState);
  const { t } = useTranslation();

  const closeLoginAlertModal = () => {
    setLoginAlertModalVisible(false);
  };

  const profileSettingOnClick = () => {
    if (isLoggedIn) {
      window.location.href = "/editProfile";
    } else {
      setLoginAlertModalVisible(true);
    }
  };
  const sendOnClick = () => {
    isLoggedIn
      ? (window.location.href = "/sendToken")
      : setLoginAlertModalVisible(true);
  };

  return (
    <>
      {!isSignup ? (
        <FullContainer>
          <LoginHeader />
          {loginAlertModalVisible && (
            <SingleModal
              visible={setLoginAlertModalVisible}
              closable={true}
              maskClosable={true}
              onClose={closeLoginAlertModal}
              text={<>{t("introPageAlert1")}</>}
              setStatus={() => setLoginModalVisible(true)}
              buttonText={t("introPageAlert2")}
            />
          )}
          <Swiper
            className="banner"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
          >
            <SwiperSlide>
              <IntroTextBox>
                <FirstIntro>
                  {t("introPageMent1")}
                  <br />
                  {t("introPageMent2")}
                </FirstIntro>
                <SecondIntro>{t("introPageMent3")}</SecondIntro>
              </IntroTextBox>
              <MainImageBanner src={MainImage1} />
            </SwiperSlide>
            <SwiperSlide>
              <IntroTextBox>
                <FirstIntro>
                  {t("introPageMent4")}
                  <br />
                  {t("introPageMent5")}
                </FirstIntro>
                <SecondIntro>{t("introPageMent6")}</SecondIntro>
              </IntroTextBox>
              <MainImageBanner src={MainImage2} />
            </SwiperSlide>
            <SwiperSlide>
              <IntroTextBox>
                <FirstIntro>
                  {t("introPageMent7")}
                  <br />
                  {t("introPageMent8")}
                </FirstIntro>
                <SecondIntro>{t("introPageMent9")}</SecondIntro>
              </IntroTextBox>
              <MainImageBanner src={MainImage3} />
            </SwiperSlide>
          </Swiper>
          <BannerBottom />
          <ButtonContainer>
            <ContainedButton
              type="secondary"
              styles="filled"
              states="default"
              size="large"
              label={
                <div
                  style={{
                    whiteSpace: "nowrap",
                    paddingLeft: "60px",
                    paddingRight: "60px",
                  }}
                >
                  {t("introPage3")}
                </div>
              }
              onClick={sendOnClick}
              style={{
                width: "auto",
                whiteSpace: "nowrap",
              }}
            />
            <ContainedButton
              type="primary"
              styles="filled"
              states="default"
              size="large"
              label={t("introPage4")}
              onClick={profileSettingOnClick}
            />
          </ButtonContainer>
        </FullContainer>
      ) : (
        <CreateLinkPage />
      )}
    </>
  );
};

export default IntroPage;
