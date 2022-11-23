import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import { IconButton } from "../button";
import { ProfileSmall, ChevronLeft, ExternalLink } from "../../assets/icons";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";

const HeaderContainer = styled.div`
  width: 100%;
  height: 74px;
  border-bottom: 1px solid ${palette.grey_7};
  padding: 17px 20px;
  position: relative;
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

const SettingProfileHeader = ({
  onVisible,
  title,
  iconLeft = ChevronLeft,
  iconRight = ExternalLink,
}) => {
  const [userInfo, setUserInfo] = useState();
  const [dropBoxOn, setDropBoxOn] = useState(false);

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      setUserInfo(JSON.parse(globalUserInfo));
    }
  }, [getLocalUserInfo()]);

  const loginOnClick = () => {
    console.log("jell");
    onVisible(true);
  };

  const profileImgOnClick = () => {
    setDropBoxOn(!dropBoxOn);
  };

  const profileImgOnClose = () => {
    setDropBoxOn(false);
  };

  const backOnClick = () => {
    window.history.back();
  };

  const externalOnClick = () => {
    alert("준비중입니다.");
  };

  return (
    <HeaderContainer>
      <InnerContainer>
        <IconButton
          type="secondary"
          styles="outlined"
          states="default"
          size="xs"
          icon={iconLeft}
          onClick={backOnClick}
        />
        <TitleContainer>{title}</TitleContainer>
        <IconButton
          type="primary"
          styles="filled"
          states="default"
          size="xs"
          icon={iconRight}
          onClick={externalOnClick}
        />
      </InnerContainer>
    </HeaderContainer>
  );
};

export default SettingProfileHeader;
