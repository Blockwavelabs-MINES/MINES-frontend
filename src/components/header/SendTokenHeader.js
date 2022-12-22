import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import { IconButton, TextButton } from "../button";
import { ProfileSmall, ChevronLeft, ExternalLink } from "../../assets/icons";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 74px;
  border-bottom: 1px solid ${palette.grey_7};
  padding: 22px 20px 12px 20px;
  background-color: ${palette.white};
  position: fixed;
  top: 0px;
  z-index: 10;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto 0px;
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  ${Typograpy.Headline1}
  color: ${palette.Black};
  font-family: Montserrat;
  margin: auto 0px;
`;

const SendTokenHeader = ({
  onVisible,
  title,
  iconLeft = ChevronLeft,
  leftOnClick,
  rightOnClick,
}) => {
  const leftIconOnClick = () => {
    leftOnClick(false);
  };

  return (
    <HeaderContainer>
      <InnerContainer>
        <div style={{ width: "58px" }}>
          <IconButton
            type="secondary"
            styles="outlined"
            states="default"
            size="xs"
            icon={iconLeft}
            onClick={leftIconOnClick}
          />
        </div>
        <TitleContainer>{title}</TitleContainer>
        <div style={{ width: "58px" }}>
          {rightOnClick ? (
            <TextButton
              styles="active"
              states="default"
              size="large"
              label="닫기"
              onClick={rightOnClick}
            />
          ) : (
            <></>
          )}
        </div>
      </InnerContainer>
    </HeaderContainer>
  );
};

export default SendTokenHeader;
