import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Lottie from "react-lottie-player";

import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import styled from "styled-components";

import TransactionCard from "./TransactionCard";
import animation from "assets/lottie/scroll-loading-lottie.json";

import { getTrxsList } from "utils/api/trxs";

const FullContainer = styled.div`
  margin-bottom: 20px;
  padding-bottom: 5px;
  gap: 24px;
  border-radius: 20px;
  background-color: ${palette.white};
  box-shadow: 0px 13px 40px 0px ${palette.grey_7};
  min-height: 60vh;
`;

const ContainerHeader = styled.div`
  display: flex;
  padding: 34px 16px 8px 16px;
  margin: 37px 24px 16px 0px;
  align-items: flex-start;
  ${Typography.Headline2};
  color: ${palette.Black};
`;

const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DateDivider = styled.div`
  padding-left: 20px;
  ${Typography.Caption1};
  color: ${palette.grey_1};
`;

const StyledLottie = styled(Lottie)`
  width: 100%;
  height: 42px;
`;

const TransactionHistory = ({ userName, socialData }) => {
  const [lists, setLists] = useState({});
  const [prevIdx, setPrevIdx] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [targetRef, isView] = useInView();

  useEffect(() => {
    if (isView && hasMore) {
      fetchData();
    }
  }, [isView, hasMore])

  async function fetchData() {
    console.log("fetch data");
    try {
      setIsLoading(true);

      if (hasMore) {
        const res = await getTrxsList(prevIdx);

        if (res.lastLoadedId === 0) {
          console.log('has more false');
          setHasMore(false);
        } 
        else {
          setPrevIdx(res.lastLoadedId);
          mergeNewData(res.transactions);
        }
      }
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setIsLoading(false);
    }
  }

  const mergeNewData = (newData) => {
    let updatedData = { ...lists };
  
    Object.keys(newData).forEach((key) => {
      if (updatedData[key]) {
        updatedData[key] = [...updatedData[key], ...newData[key]];
      } else {
        updatedData[key] = newData[key];
      }
    });
    console.log('updatedData: ', updatedData);

    setLists(updatedData);
  };

  const convert = (date) => {
    const splited = date.split('-');
    const result = splited[1] + '.' + splited[2];

    return result;
  }

  return (  
    <FullContainer>
      <ContainerHeader>
        Transaction History
      </ContainerHeader>
      <TransactionContainer>
        {/* lists = { 2023-08-07: [~], 2023-08-08: [~] } */}
        {Object.keys(lists).map((list, idx) => (
          <>
            <DateDivider>
              {convert(list)}
            </DateDivider>
            <TransactionCard 
              list={lists[list]}
              socialData={socialData}
              key={idx}
            />
          </>
        ))}
        {isLoading && 
          <StyledLottie animationData={animation} loop={true} play />
        }
        {!isLoading && <div ref={targetRef}></div>}
      </TransactionContainer>
    </FullContainer>
  );
}
 
export default TransactionHistory;