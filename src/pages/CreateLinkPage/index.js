import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../components/button";
import { InputBox } from "../../components/input";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import CreateSuccess from "./CreateSuccess";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
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
  // bottom: 100px;
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

  useEffect(() => {
    if (linkId.length > 0) {
      setState("typing");
    } else {
      setState("inactive");
    }

    var regExp = /^[a-zA-Z0-9_]+[a-zA-Z0-9_]{4,18}$/g;
    var testResult = regExp.test(linkId);

    if ((linkId.length <= 4 || linkId.length >= 20) && linkId) {
      setState("error");
      setErrorComment(
        "Your user ID must be longer than 4, less than 20 characters."
      );
    } else if (!testResult && linkId) {
      setState("error");
      setErrorComment(
        "Your username can only contain letters, numbers and '_'"
      );
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

  const createOnClick = () => {
    setCreateSuccess(true);
  };
  return (
    <FullContainer>
      {createSuccess ? (
        <CreateSuccess />
      ) : (
        <>
          <IntroTextBox>
            <FirstIntro>나만의 링크 만들기</FirstIntro>
            <SecondIntro>
              나만의 링크를 생성하고 <br /> 디지털 아이덴티티를 확장해보세요
            </SecondIntro>
          </IntroTextBox>
          <InputContainer>
            <InputBox
              label="링크 생성"
              isRequired={false}
              state={state}
              placeholder={"your_link"}
              message={errorComment}
              fixedMent={"Web3tree.io/"}
              fixedMentSize={"103px"}
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
                label="생성하기"
              />
            ) : (
              <ContainedButton
                type="primary"
                styles="filled"
                states="default"
                size="large"
                label="생성하기"
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
