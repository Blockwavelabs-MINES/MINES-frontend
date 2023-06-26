import confettiLottie from "assets/lottie/confetti-lottie.json";
import { ContainedButton } from "components/button";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie-player";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const IntroTextBox = styled.div`
  width: 90%;
  margin: 0px auto;
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
  padding: 30px 20px;
  padding-bottom: 160px;
  position: absolute;
  top: 460px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);
`;

const LottieContainer = styled.div`
  width: 280px;
  height: 280px;
  margin: 72px auto 0 auto;
`;

const CreateSuccess = () => {
  const { t } = useTranslation();

  const accountLinkOnClick = () => {
    window.location.href = "/accountLinking";
  };

  return (
    <>
      <IntroTextBox>
        <FirstIntro>{t("createLinkDone1")} </FirstIntro>
        <SecondIntro>
          {t("createLinkDone2")}
          <br />
          {t("createLinkDone2_2")}
        </SecondIntro>
      </IntroTextBox>
      <LottieContainer>
        <Lottie animationData={confettiLottie} play />
      </LottieContainer>
      <ButtonContainer>
        <ContainedButton
          type="primary"
          styles="filled"
          states="default"
          size="large"
          label={t("createLinkDone3")}
          onClick={accountLinkOnClick}
        />
      </ButtonContainer>
    </>
  );
};

export default CreateSuccess;
