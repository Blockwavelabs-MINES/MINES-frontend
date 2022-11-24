import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { IconButton, TextButton } from "../button";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";

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

const ProfileHeader = () =>
  //   { rightOnClick }
  {
    const rightIconOnClick = () => {
      // rightOnClick();
      // alert("준비중입니다.");
      const handleCopyClipBoard = async (text) => {
        var textarea = document.createElement("textarea");
        textarea.value = text; // 복사할 메시지
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 9999); // For IOS
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("링크 복사 완료!");
      };

      handleCopyClipBoard(window.location.href);
    };

    return (
      <HeaderContainer>
        <InnerContainer>
          <TextButton
            styles="active"
            states="default"
            size="large"
            label="링크 복사"
            onClick={rightIconOnClick}
          />
        </InnerContainer>
      </HeaderContainer>
    );
  };

export default ProfileHeader;
