import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../components/button";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { CreateSuccess as SuccessImg } from "../../assets/icons";
import { useTranslation } from "react-i18next";

const IntroTextBox = styled.div`
  width: 90%;
  margin: 0px auto;
  // margin-top: 70px;
`;

const InputContainer = styled.div`
  width: 90%;
  margin: 0px auto;
  margin-top: 70px;
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
  //   bottom: 100px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);
`;

const SuccessImage = styled.img`
  width: 200px;
  height: 200px;
  margin-top: 63px;
`;

const CreateSuccess = ({linkId}) => {
  const { t } = useTranslation();

  const settingOnClick = () => {
    window.location.href = "/editProfile";
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
      alert(t("createLinkDone5"));
    };

    handleCopyClipBoard(`https://3tree.io/@${linkId}`);
  };
  return (
    <>
      <IntroTextBox>
        <FirstIntro>{t("createLinkDone1")}</FirstIntro>
        <SecondIntro>
        {t("createLinkDone2")}<br />{t("createLinkDone2_2")}
        </SecondIntro>
      </IntroTextBox>
      <SuccessImage src={SuccessImg} />
      <ButtonContainer>
        <ContainedButton
          type="primary"
          styles="filled"
          states="default"
          size="large"
          label={t("createLinkDone3")}
          onClick={settingOnClick}
        />
        <ContainedButton
          type="primary"
          styles="outlined"
          states="default"
          size="large"
          label={t("createLinkDone4")}
          onClick={copyOnClick}
        />
      </ButtonContainer>
    </>
  );
};

export default CreateSuccess;
