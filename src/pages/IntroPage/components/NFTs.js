import { useEffect } from "react";

import { NFTCard } from ".";

import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import styled from "styled-components";

import { ChevronLeft, ChevronRightGray } from "assets/icons"

import { NftDummy } from "../data/dummy";
import { IconButton } from "components/button";

const FullContainer = styled.div`
  width: 90%;
  padding: 0px 0px 38px 0px;
  margin-top: 75px;
  gap: 24px;
  border-radius: 20px;
  background: ${palette.white};
  box-shadow: 0px 13px 40px 0px ${palette.grey_7};
`;

const ContainerHeader = styled.div`
  display: flex;
  padding: 8px 16px;
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 24px;
  align-items: flex-start;
  ${Typography.Headline2};
  color: ${palette.Black};
`;

const NFTContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  gap: 20px;
  position: relative;
  justify-content: center;
  margin: auto;
  margin-bottom: 40px;
`;

const PageContainer = styled.div`
  background: ${palette.grey_1};
`;

const LeftButton = styled(IconButton)`
  background-color: ${palette.white};
`;

const NFTs = () => {

  useEffect(() => {
    
  }, [])

  return (  
    <FullContainer>
      <ContainerHeader>
        NFTs
      </ContainerHeader>
      <NFTContainer>
        {NftDummy.map((dummy) => (
          <NFTCard
            title={dummy.title}
            desc={dummy.desc}
            image={dummy.image}
            key={dummy.id}
          />
        ))}
      </NFTContainer>
      <PageContainer>
        <IconButton 
          size="xs"
          icon={ChevronLeft}
          styles="outlined"
        />
        <IconButton
          size="xs"
          icon={ChevronRightGray}
          styles="outlined"
        />
      </PageContainer>
    </FullContainer>
  );
}
 
export default NFTs;