import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../components/button";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { CreateSuccess as SuccessImg } from "../../assets/icons";
import { useTranslation } from "react-i18next";
import { CopyPivot } from "../../components/modal";
import { useSetRecoilState } from "recoil";
import { signupState } from "../../utils/atoms/login";

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

const CreateSuccess = ({ linkId }) => {
  const [copyPivotVisible, setCopyPivotVisible] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const setIsSignup = useSetRecoilState(signupState);

  const myRef = useRef(null);
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

      if (myRef.current) {
        let tmpX = myRef.current.getBoundingClientRect().top;
        let tmpY = myRef.current.getBoundingClientRect().left;
        console.log(tmpX);
        console.log(tmpY);
        setClickX(tmpX);
        setClickY(tmpY);
      }
      setCopyPivotVisible(true);
      // alert(t("createLinkDone5"));
    };

    handleCopyClipBoard(`https://3tree.io/@${linkId}`);
  };

  const copyOnClose = () => {
    setCopyPivotVisible(false);
  };

  return (
    <>
      <IntroTextBox>
        <FirstIntro>{t("createLinkDone1")}</FirstIntro>
        <SecondIntro>
          {t("createLinkDone2")}
          <br />
          {t("createLinkDone2_2")}
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
        <div ref={myRef}>
          <ContainedButton
            type="primary"
            styles="outlined"
            states="default"
            size="large"
            label={t("createLinkDone4")}
            onClick={copyOnClick}
          />
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
      </ButtonContainer>
    </>
  );
};

export default CreateSuccess;
