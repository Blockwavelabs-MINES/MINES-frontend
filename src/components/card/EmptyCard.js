import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";

const FullContainer = styled.div`
  height: 212px;
  width: 100%;
  padding-top: 40px;
  margin-bottom: 38px;
`;

const ImageContainer = styled.img`
  width: 100px;
  height: 100px;
  margin: 0px auto;
  margin-bottom: 24px;
`;

const TextContainer = styled.div`
  width: 100%;
  ${Typograpy.Body}
  text-align: center;
  color: ${palette.grey_2};
`;

const EmptyCard = ({ icon, text }) => {
  return (
    <FullContainer>
      <ImageContainer src={icon} />
      <TextContainer>
        아직 연결된 {text} 없어요. <br />
        새로운 링크를 추가해보세요!
      </TextContainer>
    </FullContainer>
  );
};

export default EmptyCard;
