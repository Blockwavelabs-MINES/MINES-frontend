import { ContainedButton } from "components/button";
import { InputBox } from "components/input";
import { BottomModal } from "components/modal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
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
  const [linkId, setLinkId] = useState(original?.link_id);
  const [title, setTitle] = useState(original?.linkTitle);
  const [url, setUrl] = useState(original?.linkUrl);
  const [canSave, setCanSave] = useState(false);
  const [linkInputState, setLinkInputState] = useState("filled");
  const [linkErrorComment, setLinkErrorComment] = useState("");
  const [titleInputState, setTitleInputState] = useState("filled")
  const [titleErrorComment, setTitleErrorComment] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    let regex = /http(s)?[:\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
    
    if (url && regex.test(url)) {
      setCanSave(true);
      setLinkErrorComment("");
      setLinkInputState("filled");
    } 
    else if (!url) {
      setCanSave(false);
      setLinkErrorComment("");
      setLinkInputState("filled");
    } 
    else {
      setCanSave(false);
      setLinkErrorComment(t("editLinkModal7"));
      setLinkInputState("error");
    }
  }, [url]);

  useEffect(() => {
    if (title) {
      setCanSave(true);
      setTitleErrorComment("");
      setTitleInputState("filled");
    } 
    else if (url && !title) {
      setCanSave(false);
      setTitleErrorComment(t("editLinkModal8"));
      setTitleInputState("error");
    }
  }, [title, url]);

  useEffect(() => {
    setLinkId(original?.id);
    setTitle(original?.linkTitle);
    setUrl(original?.linkUrl);
  }, [original]);

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
            isRequired={true}
            placeholder={t("editLinkModal3")}
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            message={titleErrorComment}
            state={titleInputState}
          />
          <InputBox
            label={t("editLinkModal4")}
            isRequired={true}
            placeholder={t("editLinkModal5")}
            value={url || ""}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            message={linkErrorComment}
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
