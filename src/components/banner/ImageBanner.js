import styled from 'styled-components';
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const FullContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  background: ${palette.sky_3};
  border-radius: 8px;
  gap: 8px;
  box-sizing: border-box;
  margin-bottom: 18px;
`;

const TextWrapper = styled.div`
  gap: 4px;
`;

const BannerDescription = styled.div`
  ${Typography.Caption2}
  color: ${palette.Black};
`;

const BannerTitle = styled.div`
  ${Typography.Caption1}
  color: ${palette.Black};
`;

const BannerImage = styled.img`
  width: 62px;
  height: 62px;
  margin: -16px;
`;

const ImageBanner = ({ image, description, title }) => {
  return ( 
    <FullContainer>
      <TextWrapper>
        <BannerDescription>{description}</BannerDescription>
        <BannerTitle>{title}</BannerTitle>
      </TextWrapper>
      <BannerImage src={image} />
    </FullContainer>
   );
}
 
export default ImageBanner;