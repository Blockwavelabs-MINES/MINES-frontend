import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import styled from "styled-components";
import { EthereumImage, GoerliImage } from "assets/images";
import { useEffect } from "react";
import { ContainedButton } from "components/button";
import { useState } from "react";

const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 8px 16px;
  align-self: stretch;
  background-color: ${palette.white};
`;

const TickerImage = styled.img`
  width: 42px;
  height: 42px;
  align-self: center;
`;

const TextWrapper = styled.div`
  margin-left: 16px;
  margin-right: auto;
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
  justify-self: flex-end;
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
    status === "receive" ? palette.blue_1 : palette.background
  };
  border: ${({ status }) => 
    status === "receive" ? `1px solid ${palette.blue_1}` :  `1px solid ${palette.background}`
  };
  cursor: ${({ status }) =>
    status === "receive" ? 'pointer' : 'default'
  };
`;

const StatusLabel = styled.div`
  ${Typography.Headline2}
  font-size: 15px;
  color: ${({ status }) => 
    status === "receive" ? palette.white : palette.grey_3
  };
  margin: auto 0;
`;

const onReceiveClick = (linkKey) => {
  window.location.href = `/receiveToken/${linkKey}`;
}

const ButtonComponent = ({ status, linkKey, isRefund, isSender }) => {
  return (
    <ButtonWrapper>
      {
        (isRefund === true) ? (
          <StatusButton status="refund">
            <StatusLabel status ="refund">Refund</StatusLabel>
          </StatusButton>
        ) : (
          (status === "SUCCESS" && linkKey === "") ? (
            <StatusButton status="complete">
              <StatusLabel status="complete">Complete</StatusLabel>
            </StatusButton>
          ) : (
            (status === "SUCCESS" && linkKey !== "" && !isSender) ? (
              <StatusButton status="receive" onClick={() => onReceiveClick(linkKey)}>
                <StatusLabel status="receive">Receive</StatusLabel>
              </StatusButton>
            ) : (
              (status === "SUCCESS" && linkKey !== "" && isSender) ? (
                <StatusButton status="pending">
                  <StatusLabel status="pending">Pending</StatusLabel>
                </StatusButton>
              ) : (
                (status === "PENDING") ? (
                  <StatusButton status="pending">
                    <StatusLabel status="pending">Pending</StatusLabel>
                  </StatusButton>
                ) : (
                  <StatusButton status="fail">
                    <StatusLabel status="fail">Fail</StatusLabel>
                  </StatusButton>
                )
              )
            )
          )
        )
      }
    </ButtonWrapper>
  )
}

const TransactionCard = ({ list, socialData }) => {
  return (  
    list.map((card, idx) => (
      <CardContainer key={idx}>
        <TickerImage src={card.tickerImageUrl} />
        {/* item.username: 소셜계정 ID, card.senderName: 보낸 사람의 3tree ID  */}
        {socialData.some(item => item.username === card.senderName) ? (
          <>
            <TextWrapper>
              <UserWrapper>@{card.receiverName}</UserWrapper>
              <AmountWrapper isSender={true}>-{card.tokenAmount} ETH</AmountWrapper>
            </TextWrapper>
            <ButtonComponent 
              status={card.status}
              linkKey={card.linkKey}
              isRefund={card.isRefund}
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
              isRefund={card.isRefund}
              isSender={false}
            />
          </>
        )}
      </CardContainer>
    ))
  );
}
 
export default TransactionCard;