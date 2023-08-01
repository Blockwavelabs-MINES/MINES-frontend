import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import styled from "styled-components";

const CardContainer = styled.div`
  
`;

const NFTImage = styled.img`
  max-width: 96px;
  max-height: 96px;
  margin: auto;
`;

const NFTCard = ({ title, desc, image }) => {
  return (  
    <CardContainer>
      <NFTImage
        src={image}
      />
    </CardContainer>
  );
}
 
export default NFTCard;