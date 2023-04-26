import { CopyPivot } from "components/modal";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TextButton } from "../button";

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 74px;
  padding: 22px 20px 12px 20px;
  background-color: transparent;
  position: fixed;
  top: 0px;
  z-index: 10;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto 0px;
  display: flex;
  justify-content: right;
`;

const ProfileHeader = () => {
  const [copyPivotVisible, setCopyPivotVisible] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);

  const myRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (myRef.current) {
      let tmpX = myRef.current.getBoundingClientRect().top;
      let tmpY = myRef.current.getBoundingClientRect().left;
      setClickX(tmpX);
      setClickY(tmpY);
    }
  }, []);

  const rightIconOnClick = () => {
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
        let tmpY = myRef.current.getBoundingClientRect().right;
        setClickX(tmpX);
        setClickY(tmpY);
      }
      setCopyPivotVisible(true);
    };

    handleCopyClipBoard(window.location.href);
  };

  const copyOnClose = () => {
    setCopyPivotVisible(false);
  };

  return (
    <HeaderContainer>
      <InnerContainer>
        <div ref={myRef}>
          <TextButton
            styles="active"
            states="default"
            size="large"
            label={t("profilePage3")}
            onClick={rightIconOnClick}
          />
        </div>
        {copyPivotVisible && (
          <CopyPivot
            visible={copyPivotVisible}
            closable={true}
            maskClosable={true}
            onClose={copyOnClose}
            label={t("sendPage03_10")}
            type={"down"}
            x={clickX + 45}
            y={clickY - 10}
          />
        )}
      </InnerContainer>
    </HeaderContainer>
  );
};

export default ProfileHeader;
