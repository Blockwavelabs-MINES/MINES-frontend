import { useEffect } from "react";

import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import styled from "styled-components";

const FullContainer = styled.div`
  display: flex;
  width: 90%;
  padding: 24px 0px 38px 0px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  border-radius: 20px;
  background: ${palette.white};
`;

const NFTs = () => {

  useEffect(() => {

  }, [])

  return (  
    <FullContainer>
      NFTs
    </FullContainer>
  );
}
 
export default NFTs;