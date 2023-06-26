import axios from "axios";
import { ContainedButton } from "components/button";
import { InputBox } from "components/input";
import CreateSuccess from "pages/CreateLinkPage/CreateSuccess";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { checkUserId } from "utils/api/auth";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 70px;
`;

const IntroTextBox = styled.div`
  width: 90%;
  margin: 0px auto;
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
  bottom: 136px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);
`;

// state = ["inactive", "filled", "typing", "verified", "error", "help"]

const CreateLinkPage = () => {
  const [linkId, setLinkId] = useState("");
  const [state, setState] = useState("inactive");
  const [createSuccess, setCreateSuccess] = useState(false);
  const [errorComment, setErrorComment] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    linkId.length > 0 ? setState("typing") : setState("inactive");

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

  const createOnClick = () => {
    checkUserId(linkId)
      .then(async () => {
        await axios
          .put(
            `/users/edit/userid?new_id=${linkId}`,
            {},
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          )
          .then(() => {
            setCreateSuccess(true);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch(() => {
        setState("error");
        setErrorComment(
          `${t("createLink7")} "${linkId}" ${t("createLink7_2")}`
        );
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
              fixedMent={"@"}
              fixedMentSize={"33px"}
              value={linkId}
              onChange={(e) => {
                setLinkId(e.target.value);
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
