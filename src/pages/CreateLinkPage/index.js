import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../components/button";
import { InputBox } from "../../components/input";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import CreateSuccess from "./CreateSuccess";
import {
  setLocalUserInfo,
  getLocalUserInfo,
} from "../../utils/functions/setLocalVariable";
import { createUserId, checkUserId } from "../../utils/api/auth";
import { useTranslation } from "react-i18next";

const FullContainer = styled.div`
  width: 100%;
  // height: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 70px;
`;

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
  position: absolute;
  top: 460px;
  padding-bottom: 160px;
  // bottom: 100px;
  bottom: 136px; // +76px
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);
`;

// state = ["inactive", "filled", "typing", "verified", "error", "help"]

const CreateLinkPage = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [linkId, setLinkId] = useState("");
  const [state, setState] = useState("inactive");
  const [createSuccess, setCreateSuccess] = useState(false);
  const [errorComment, setErrorComment] = useState("");
  const [userInfo, setUserInfo] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    let globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      setUserInfo(globalUserInfo);
    }
  }, []);

  useEffect(() => {
    if (linkId.length > 0) {
      setState("typing");
    } else {
      setState("inactive");
    }

    let regExp = /^[a-zA-Z0-9_]+[a-zA-Z0-9_]{4,18}$/g;
    let testResult = regExp.test(linkId);

    if ((linkId.length <= 4 || linkId.length >= 20) && linkId) {
      setState("error");
      setErrorComment(t("createLink6"));
    } else if (!testResult && linkId) {
      setState("error");
      setErrorComment(t("createLink5"));
    } else {
      setErrorComment("");
    }
  }, [linkId]);

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const linkIdOnChange = (e) => {
    setLinkId(e.target.value);
  };

  const createOnClick = async () => {
    await checkUserId(linkId).then(async (data) => {
      console.log(data);
      if (data == false) {
        await createUserId(linkId).then((data) => {
          console.log(data);
          setCreateSuccess(true);
        });
      } else {
        setState("error");
        setErrorComment(
          `${t("createLink7")} "${linkId}" ${t("createLink7_2")}`
        );
      }
    });
  };
  return (
    <FullContainer>
      {createSuccess ? (
        <CreateSuccess linkId={linkId} />
      ) : (
        <>
          <IntroTextBox>
            <FirstIntro>{t("createLink1")}</FirstIntro>
            <SecondIntro>
              {t("createLink2")}
              <br />
              {t("createLink2_2")}
            </SecondIntro>
          </IntroTextBox>
          <InputContainer>
            <InputBox
              label={t("createLink3")}
              isRequired={false}
              state={state}
              placeholder={"UserID"}
              message={errorComment}
              fixedMent={"3tree.io/@"}
              fixedMentSize={"93px"}
              value={linkId}
              onChange={(e) => {
                linkIdOnChange(e);
              }}
            />
          </InputContainer>

          <ButtonContainer>
            {state == "inactive" || state == "error" ? (
              <ContainedButton
                type="primary"
                styles="filled"
                states="disabled"
                size="large"
                label={t("createLink8")}
              />
            ) : (
              <ContainedButton
                type="primary"
                styles="filled"
                states="default"
                size="large"
                label={t("createLink8")}
                onClick={createOnClick}
              />
            )}
          </ButtonContainer>
        </>
      )}
    </FullContainer>
  );
};

export default CreateLinkPage;
