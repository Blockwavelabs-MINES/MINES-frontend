import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { InputBox } from "../../../components/input";
import { InfoCard } from "../../../components/card";
import { ContainedButton } from "../../../components/button";
import { createUserId, checkUserId } from "../../../utils/api/auth";
import {
  setLocalUserInfo,
  getLocalUserInfo,
} from "../../../utils/functions/setLocalVariable";

const Container = styled.div`
  width: 100%;
  padding: 58px 21px;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 163px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 58px;
`;

const ChangeID = () => {
  const [linkId, setLinkId] = useState("");
  const [state, setState] = useState("inactive");
  const [errorComment, setErrorComment] = useState("");
  const [userInfo, setUserInfo] = useState();

  const { t } = useTranslation();

  const infoHeader = t("changeUserId6");
  const infoDescription = t("changeUserId7");

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      setUserInfo(globalUserInfo);
      console.log(globalUserInfo);
    }
  }, []);

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
      setErrorComment(t("createLink6"));
    } else if (!testResult && linkId) {
      setState("error");
      setErrorComment(t("createLink5"));
    } else {
      setErrorComment("");
    }
  }, [linkId]);

  const linkIdOnChange = (e) => {
    setLinkId(e.target.value);
  };

  const createOnClick = async () => {
    const checkUserIdResult = await checkUserId(linkId).then(async (data) => {
      console.log(data);
      if (data == false) {
        const createUserIdResult = await createUserId(
          linkId,
          userInfo.user.index
        ).then((data) => {
          setLocalUserInfo({
            type: "edit",
            editKey: ["user", "user_id"],
            editValue: linkId,
          });
          window.location.href = "/";
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
    <Container>
      <InputContainer>
        <InputBox
          label={t("changeUserId1")}
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
      <InfoCard header={infoHeader} info={infoDescription} />
      <ButtonContainer>
        {state == "inactive" || state == "error" ? (
          <ContainedButton
            type="primary"
            styles="filled"
            states="disabled"
            size="large"
            label={t("changeUserId8")}
          />
        ) : (
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label={t("changeUserId8")}
            onClick={createOnClick}
          />
        )}
      </ButtonContainer>
    </Container>
  );
};

export default ChangeID;
