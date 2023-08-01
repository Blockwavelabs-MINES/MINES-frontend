import { MainImage3 } from "assets/images";
import { LoginHeader } from "components/header";
import TwitterCard from "components/metatags/TwitterCard";
import { SingleModal } from "components/modal";
import { BottomNavBar } from "components/navbar";
import CreateLinkPage from "pages/CreateLinkPage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { loginModalVisibleState, loginState, signupState } from "utils/atoms/login";
import { receiveLinkState } from "utils/atoms/twitter";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import { Dashboard } from "./components";

SwiperCore.use([Navigation, Pagination]);

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
  align-items: center;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 35px;
  align-items: center;
  background-color: #FAFAFA;
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
  const setLoginModalVisible = useSetRecoilState(loginModalVisibleState);
  const setReceiveLink = useSetRecoilState(receiveLinkState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const { t } = useTranslation();

  useEffect(() => {
    setReceiveLink("");
  }, [])

  return (
    <>
      <TwitterCard
        title={"3TREE"}
        description={"소셜계정만으로 간편하게 송금하기"}
        image={"https://i.ibb.co/yWJBwgv/twitterCard.png"}
      />

      {!isSignup ? (
        <>
          {!isLogin ? (
            <FullContainer>
              <LoginHeader />
              {loginAlertModalVisible && (
                <SingleModal
                  visible={setLoginAlertModalVisible}
                  closable={true}
                  maskClosable={true}
                  onClose={() => setLoginAlertModalVisible(false)}
                  text={<>{t("introPageAlert1")}</>}
                  setStatus={() => setLoginModalVisible(true)}
                  buttonText={t("introPageAlert2")}
                />
              )}
              <IntroTextBox>
                  <FirstIntro>
                    {t("introPageMent7")}
                    <br />
                    {t("introPageMent8")}
                  </FirstIntro>
                  <SecondIntro>{t("introPageMent9")}</SecondIntro>
              </IntroTextBox>
              <MainImageBanner src={MainImage3} />
              <BannerBottom />
            </FullContainer>
          ) : (
            <DashboardContainer>
              <LoginHeader />
              <Dashboard />
            </DashboardContainer>
          )}
          <BottomNavBar />
        </>
      ) : (
        <CreateLinkPage />
      )}
    </>
  );
};

export default IntroPage;
