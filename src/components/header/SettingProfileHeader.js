import { ChevronLeft, ExternalLink } from "assets/icons";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typograpy from "utils/style/Typography";
import { IconButton } from "../button";

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

const SettingProfileHeader = ({
  title,
  userId,
  iconLeft = ChevronLeft,
  iconRight = ExternalLink,
}) => {
  const backOnClick = () => {
    window.location.href = '/';
  };

  const externalOnClick = () => {
    window.open("/profile/" + userId);
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
