import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typography from "../../utils/style/Typography";

const FullContainer = styled.div`
  width: 100%;
  min-height: 480px;
  border-radius: 32px;
  background-color: ${palette.white};
  filter: drop-shadow(0px 2px 10px #c4c4c444);
  margin-bottom: 30px;
  padding: 40px 3%;
`;

const ContainerHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  ${Typography.Heading2}
`;

const CategoryContainer = styled.div``;

const CategoryTitle = styled.div`
  ${Typography.Heading2}
  color: ${palette.light_black};
  margin-left: 15px;
  margin-bottom: 11px;
  margin-top: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.light_gray};
  margin: 0px 10px;
  margin-bottom: 10px;
`;

const NftImageBox = styled.div`
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  box-shadow: 0px 2px 10px #57599240;
  border-radius: 10px;
  overflow: hidden;
  margin: 9px;
  //   filter: drop-shadow(0px 2px 10px #57599240);
`;

const NftImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin: auto;
  // vertical-align: middle;
`;

const FullBadgeBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const BadgeContainer = styled.div`
  display: grid;
  // flex-wrap: wrap;
  // justify-content: flex-start;
  // align-content: space-between;
  grid-template-columns: repeat(auto-fill, 100px);
  gap: 20px;
  position: relative;
  justify-content: center;
  margin: auto;
  margin-bottom: 40px;
`;

const PoapImageBox = styled.div`
  width: 100px;
  height: 100px;
  text-align: center;
  margin: 9px;
  line-height: 100px;
  box-shadow: 0px 2px 10px #57599240;
  border-radius: 50px;
  overflow: hidden;
  //   filter: drop-shadow(0px 2px 10px #57599240);
`;

const PoapImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin: auto;
  // vertical-align: middle;
`;

const ViewAllButton = styled.button`
  ${Typography.Heading4}
  text-align: right;
  background-color: transparent;
  border: 0;
  color: ${palette.gray};
`;

const nftLimit = 100;
const poapLimit = 100;

const TestPage = (props) => {
  const [nftData, setNftData] = useState(props.nftData?.slice(0, nftLimit));
  const [poapData, setPoapData] = useState(props.poapData?.slice(0, poapLimit));
  const [loading, setLoading] = useState(props.loading);

  useEffect(() => {
    setNftData(props.nftData?.slice(0, nftLimit));
  }, [props.nftData]);

  useEffect(() => {
    setPoapData(props.poapData?.slice(0, poapLimit));
  }, [props.poapData]);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  return (
    <FullContainer>
      <ContainerHeader>
        <HeaderTitle>NFTs</HeaderTitle>
      </ContainerHeader>

      <CategoryContainer>
        <CategoryTitle>Balances</CategoryTitle>
        <BadgeContainer>

        </BadgeContainer>
      </CategoryContainer>

      <CategoryContainer>
        <CategoryTitle>NFTs</CategoryTitle>
        <BadgeContainer>

        </BadgeContainer>
      </CategoryContainer>
    </FullContainer>
  );
};

export default TestPage;
