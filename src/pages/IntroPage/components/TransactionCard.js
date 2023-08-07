import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import styled from "styled-components";
import { EthereumImage, GoerliImage } from "assets/images";
import { useEffect } from "react";
import { ContainedButton } from "components/button";
import { useState } from "react";

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 8px 16px;
  margin-bottom: 6px;
  align-self: stretch;
  background-color: ${palette.white};
`;

const TickerImage = styled.img`
  width: 42px;
  height: 42px;
  align-self: center;
`;

const TextWrapper = styled.div`
  width: 50%;
`;

const UserWrapper = styled.div`
  ${Typography.Caption2};
  color: ${palette.grey_1};
`;

const AmountWrapper = styled.div`
  ${Typography.Headline1};
  color: ${props =>
    props.isSender ? palette.black : palette.blue_1
  };
`;

const ButtonWrapper = styled.div`
  align-self: center;
`;

const StatusButton = styled.button`
  min-width: 108px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  gap: 2px;
  background-color: ${({ status }) =>
    status === "complete" ? '#E3FFF5' : 
    status === "fail" ? '#FFF3F3' : 
    status === "receive" ? palette.blue_1 :
    status === "refund" ? '#E3FFF5' : palette.grey_7 // : pending
  };
  border: ${({ status }) => 
    status === "complete" ? `1px solid ${palette.green_1}` :
    status === "fail" ? `1px solid ${palette.red_2}` :
    status === "receive" ? `1px solid ${palette.blue_1}` :
    status === "refund" ? `1px solid ${palette.green_1}` : `1px solid ${palette.grey_3}` // : pending
  };
`;

const StatusLabel = styled.div`
  ${Typography.Headline2}
  font-size: 15px;
  color: ${({ status }) => 
    status === "complete" ? palette.green_1 :
    status === "fail" ? palette.red_2 :
    status === "receive" ? palette.white :
    status === "refund" ? palette.green_1 : palette.grey_3 // : pending
  };
  margin: auto 0;
`;

const onReceiveClick = (linkKey) => {
  window.location.href = `/receiveToken/${linkKey}`;
}

const ButtonComponent = ({ status, linkKey, isSender }) => {
  return (
    <ButtonWrapper>
      {
        (status === "SUCCESS" && linkKey === "") ? (
          <StatusButton status="complete">
            <StatusLabel status ="complete">Complete</StatusLabel>
          </StatusButton>
        ) : (
          (status === "SUCCESS" && linkKey !== "" && !isSender) ? (
            <StatusButton 
              status="receive"
              onClick={() => onReceiveClick(linkKey)}
            >
              <StatusLabel status="receive">Receive</StatusLabel>
            </StatusButton>
          ) : (
            (status === "SUCCESS" && linkKey !== "" && isSender) ? (
              <StatusButton status="pending">
                <StatusLabel status="pending">Pending</StatusLabel>
              </StatusButton>
            ) : (
              (status === "FAIL") ? (
                <StatusButton status="fail">
                  <StatusLabel status="fail">Fail</StatusLabel>
                </StatusButton>
              ) : (
                <StatusButton status="refund">
                  <StatusLabel status="refund">Refund</StatusLabel>
                </StatusButton>
              )
            )
          )
        )
      }
    </ButtonWrapper>
  )
}

const TransactionCard = ({ list, socialData, userName }) => {
  return (  
    list.map((card, idx) => (
      <CardContainer key={idx}>
        <TickerImage src={card.tickerImageUrl} />
        {/* item.username: 소셜계정 ID, card.senderName: 보낸 사람의 3tree ID  */}
        {socialData.some(item => item.username === card.senderName) ? (
          <>
            <TextWrapper>
              <UserWrapper>@{card.senderName}</UserWrapper>
              <AmountWrapper isSender={true}>-{card.tokenAmount} ETH</AmountWrapper>
            </TextWrapper>
            <ButtonComponent 
              status={card.status}
              linkKey={card.linkKey}
              isSender={true}
            />
          </>
        ) : (
          <>
            <TextWrapper>
              <UserWrapper>@{card.senderName}</UserWrapper>
              <AmountWrapper isSender={false}>{card.tokenAmount} ETH</AmountWrapper>
            </TextWrapper>
            <ButtonComponent 
              status={card.status}
              linkKey={card.linkKey}
              isSender={false}
            />
          </>
        )}
      </CardContainer>
    ))
  );
}
 
export default TransactionCard;