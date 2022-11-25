import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SendTokenHeader } from "../../components/header";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";
import { useLocation } from "react-router-dom";
import { MetamaskIcon } from "../../assets/icons";
import {
  Step1,
  Step2,
  Step3,
  FinalConfirmation,
  SendSuccess,
} from "./components";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding: auto 50px;
  // padding-top: 75px;
`;

const ContentContainer = styled.div`
  padding-left: 50px;
  padding-right: 50px;
`;

const StepStatusBox = styled.div`
  display: flex;
  position: relative;
  padding-top: 105px;
  align-items: center;
  justify-content: center;
`;

const StepCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 700;
  color: ${palette.white};
  background-color: ${palette.blue_2};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const StepUnCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  box-shadow: 0px 0px 0px 2px ${palette.blue_4} inset;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  color: ${palette.blue_4};
  background-color: ${palette.white};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const StepLine = styled.div`
  width: 40px;
  height: 2px;
  margin-left: -2px;
  margin-right: -2px;
  background-color: ${palette.blue_2};
  z-index: 2;
`;

const StepUnLine = styled.div`
  width: 40px;
  height: 2px;
  margin-left: -2px;
  margin-right: -2px;
  background-color: ${palette.blue_4};
  z-index: 2;
`;

const StepHeader = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.black};
  margin-top: 36px;
  margin-bottom: 40px;
`;

const StepButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const StepLeftButton = styled.button`
  height: 33px;
  width: 73px;
  border-radius: 24px;
  border: 1px solid ${palette.blue_1};
  background-color: ${palette.white};
  color: ${palette.blue_1};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  box-shadow: 0px 10px 10px 0px #e6e6e640;
`;

const StepRightButton = styled.button`
  height: 33px;
  width: 73px;
  border-radius: 24px;
  border: 1px solid ${palette.blue_1};
  background-color: ${palette.blue_1};
  color: ${palette.white};
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  box-shadow: 0px 10px 10px 0px #e6e6e640;
`;

const SendTokenPage = () => {
  const [userInfo, setUserInfo] = useState();
  const [stepStatus, setStepStatus] = useState(1);
  const [finalModalVisible, setFinalModalVisible] = useState(false);
  const [platform, setPlatform] = useState("google");
  const [email, setEmail] = useState("");
  const [trash, setTrash] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [currency, setCurrency] = useState("");
  const [network, setNetwork] = useState("Ethereum Mainnet");
  const [networkId, setNetworkId] = useState("");
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [walletType, setWalletType] = useState("");
  const [sendDone, setSendDone] = useState(false);

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      setUserInfo(JSON.parse(globalUserInfo));
    }
  }, [getLocalUserInfo()]);

  const StepList = [
    {
      id: 1,
      text: "토큰을 보낼 소셜 계정을 입력해주세요.",
      component: Step1({
        setPlatform: setPlatform,
        setEmail: setEmail,
        setTrash: setTrash,
        email: email,
        urlInfo: "",
        platform: platform,
      }),
    },
    {
      id: 2,
      text: "해당 지갑 주소와 네트워크에서 토큰을 보내는게 맞는지 확인해주세요.",
      component: Step2({
        setWalletType: setWalletType,
        setAddress: setSenderAddress,
        setNetwork: setNetwork,
        setNetworkId: setNetworkId,
        setCurrency: setCurrency,
        walletType: walletType,
        address: senderAddress,
        network: network,
        networkId: networkId,
        currency: currency,
      }),
    },
    {
      id: 3,
      text: "보낼 토큰과 수량을 작성해주세요.",
      component: Step3({
        setAmount: setAmount,
        setCurrency: setCurrency,
        setToken: setToken,
        amount: amount,
        token: token,
        currency: currency,
      }),
    },
  ];

  const leftOnClick = () => {
    if (stepStatus == 1) {
      window.location.href = "/";
    } else {
      setStepStatus(stepStatus - 1);
    }
  };

  const rightOnClick = () => {
    if (stepStatus < StepList.length) {
      setStepStatus(stepStatus + 1);
    } else {
      setFinalModalVisible(true);
    }
  };

  return (
    <>
      {finalModalVisible ? (
        <FinalConfirmation
          platform={platform}
          email={email}
          amount={amount}
          currency={currency}
          networkId={networkId}
          walletType={walletType}
          address={senderAddress}
          network={network}
          userId={userInfo.userId}
          setVisible={setFinalModalVisible}
          setSendDone={setSendDone}
        />
      ) : (
        <>
          {sendDone ? (
            <SendSuccess />
          ) : (
            <FullContainer>
              <SendTokenHeader title="Send Token" leftOnClick={leftOnClick} />
              <StepStatusBox>
                {StepList.map((step, idx) => (
                  <>
                    {idx == 0 ? (
                      <>
                        <StepCircle>{step.id}</StepCircle>
                      </>
                    ) : (
                      <>
                        {idx < stepStatus ? (
                          <>
                            <StepLine />
                            <StepCircle>{step.id}</StepCircle>
                          </>
                        ) : (
                          <>
                            <StepUnLine />
                            <StepUnCircle>{step.id}</StepUnCircle>
                          </>
                        )}
                      </>
                    )}
                  </>
                ))}
              </StepStatusBox>
              <ContentContainer>
                <StepHeader>
                  Step 0{stepStatus}.<br />
                  {StepList[stepStatus - 1].text}
                </StepHeader>
                {StepList[stepStatus - 1].component}
                <StepButtonContainer>
                  {stepStatus == 1 ? (
                    <>
                      <div />{" "}
                      <StepRightButton onClick={rightOnClick}>
                        다음
                      </StepRightButton>
                    </>
                  ) : (
                    <>
                      <StepLeftButton onClick={leftOnClick}>
                        이전
                      </StepLeftButton>
                      <StepRightButton onClick={rightOnClick}>
                        다음
                      </StepRightButton>
                    </>
                  )}
                </StepButtonContainer>
              </ContentContainer>
            </FullContainer>
          )}
        </>
      )}
    </>
  );
};

export default SendTokenPage;
