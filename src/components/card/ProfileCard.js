import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";
import {
  CardEdit,
  CardTrash,
  ProfileLarge,
  ProfileEdit,
} from "../../assets/icons";
import { ContainedButton } from "../button";

const FullContainer = styled.div`
  width: 100%;
  padding: 60px 20px;
  background: linear-gradient(180deg, #edf2fd 0%, rgba(255, 255, 255, 0) 100%);
`;

const InnerContainer = styled.div`
  width: 100%;
`;

const ProfileImageBox = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 1px solid ${palette.grey_7};
  background-image: url(${({ profileImg }) =>
    profileImg ? profileImg : ProfileLarge});
  background-size: 120px 120px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  margin: 0px auto;
  margin-bottom: 40px;
`;

const UserNameBox = styled.div`
  ${Typograpy.Headline1}
  color: ${palette.Black};
  margin: 0px auto;
  text-align: center;
`;

const IntroductionBox = styled.div`
  max-width: 400px;
  ${Typograpy.Subhead}
  color: ${palette.grey_1};
  margin: 0px auto;
  margin-top: 14px;
  margin-bottom: 40px;
  text-align: center;
`;

const ProfileCard = ({ profileImg, userName, introduction, onClick }) => {
  const editOnClick = () => {
    alert("준비중입니다.");
  };
  return (
    <FullContainer>
      <InnerContainer>
        <ProfileImageBox profileImg={profileImg} />
        <UserNameBox>{userName}</UserNameBox>
        <IntroductionBox>{introduction}</IntroductionBox>
        <ContainedButton
          type="primary"
          styles="outlined"
          states="default"
          size="large"
          label="수정하기"
          icon={ProfileEdit}
          onClick={onClick}
        />
      </InnerContainer>
    </FullContainer>
  );
};

export default ProfileCard;
