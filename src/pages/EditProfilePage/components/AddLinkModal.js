import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { BottomModal } from "../../../components/modal";
import { InputBox } from "../../../components/input";
import { useTranslation } from "react-i18next";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  //   margin-top: 109px;
  padding: 20px;
  z-index: 903;
`;

const IntroTextBox = styled.div`
  width: 100%;
  margin: 0px auto;
  padding-top: 80px;
  margin-bottom: 45px;
`;

const TItleText = styled.div`
  text-align: left;
  ${Typography.Headline1}
  color: ${palette.Black};
  margin-bottom: 32px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 30px;
  margin-bottom: 30px;
`;

function AddLinkModalInner(saveAction, onClose, original) {
  const [linkId, setLinkId] = useState(original ? original.link_id : "");
  const [title, setTitle] = useState(original ? original.linkTitle : "");
  const [url, setUrl] = useState(original ? original.linkUrl : "");
  const [canSave, setCanSave] = useState(false);
  const [errorComment, setErrorComment] = useState("");
  const [linkInputState, setLinkInputState] = useState("typing");
  const { t } = useTranslation();

  useEffect(() => {
    let regex =
      /http(s)?[:\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
    if (title && url && regex.test(url)) {
      setCanSave(true);
      setErrorComment("");
      setLinkInputState("filled");
    } else if (!url) {
      setCanSave(false);
      setErrorComment("");
      setLinkInputState("filled");
    } else {
      setCanSave(false);
      setErrorComment(t("editLinkModal7"));
      setLinkInputState("error");
    }
  }, [title, url]);

  useEffect(() => {
    setLinkId(original?.id);
    setTitle(original?.linkTitle);
    setUrl(original?.linkUrl);
  }, [original]);

  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const urlOnChange = (e) => {
    setUrl(e.target.value);
  };

  const saveOnClick = () => {
    saveAction({ linkId: linkId, title: title, url: url });
    document.body.style.overflow = "auto";
    onClose();
  };
  return (
    <FullContainer>
      <IntroTextBox>
        <TItleText>{t("editLinkModal1")}</TItleText>
        <InputContainer>
          <InputBox
            label={t("editLinkModal2")}
            state="filled"
            isRequired={true}
            placeholder={t("editLinkModal3")}
            value={title || ""}
            onChange={(e) => titleOnChange(e)}
          />
          <InputBox
            label={t("editLinkModal4")}
            isRequired={true}
            placeholder={t("editLinkModal5")}
            value={url || ""}
            onChange={(e) => urlOnChange(e)}
            message={errorComment}
            state={linkInputState}
          />
        </InputContainer>
        {canSave ? (
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label={t("editLinkModal6")}
            onClick={saveOnClick}
          />
        ) : (
          <ContainedButton
            type="primary"
            styles="filled"
            states="disabled"
            size="large"
            label={t("editLinkModal6")}
          />
        )}
      </IntroTextBox>
    </FullContainer>
  );
}

const AddLinkModal = ({
  visible,
  closable,
  maskClosable,
  onClose,
  saveAction,
  original,
}) => {
  return (
    <BottomModal
      visible={visible}
      closable={closable}
      maskClosable={maskClosable}
      onClose={onClose}
      renderInput={() => AddLinkModalInner(saveAction, onClose, original)}
    />
  );
};

export default AddLinkModal;
