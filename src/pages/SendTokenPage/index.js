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
  LoadingComponent,
} from "./components";
import { DeleteModal } from "../../components/modal";
import { ContainedButton } from "../../components/button";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding: auto 50px;
  // padding-top: 75px;
`;

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 80px;
`;

const StepStatusBox = styled.div`
  display: flex;
  position: relative;
  padding-top: 105px;
  align-items: center;
  justify-content: left;
`;

const StepingCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  ${Typography.Headline3}
  font-family: Montserrat;
  color: ${palette.blue_2};
  background-color: ${palette.white};
  box-shadow: 0px 0px 0px 2px ${palette.blue_2} inset;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const StepCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  ${Typography.Headline3}
  font-family: Montserrat;
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
  box-shadow: 0px 0px 0px 2px ${palette.grey_6} inset;
  ${Typography.Headline3}
  font-family: Montserrat;
  color: ${palette.grey_5};
  background-color: ${palette.grey_7};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const StepLine = styled.div`
  width: 30px;
  height: 2px;
  margin-left: -2px;
  margin-right: -2px;
  background-color: ${palette.blue_2};
  z-index: 2;
`;

const StepUnLine = styled.div`
  width: 30px;
  height: 2px;
  margin-left: -2px;
  margin-right: -2px;
  background-color: ${palette.grey_6};
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

const StepComponentBox = styled.div`
  min-height: 40vh;
`;

const SendTokenPage = () => {
  const [userInfo, setUserInfo] = useState();
  const [stepStatus, setStepStatus] = useState(1);
  const [finalModalVisible, setFinalModalVisible] = useState(false);
  const [platform, setPlatform] = useState("google");
  const [email, setEmail] = useState("");
  const [platformIcon, setPlatformIcon] = useState("");
  const [trash, setTrash] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [currency, setCurrency] = useState("");
  const [network, setNetwork] = useState("Ethereum Mainnet");
  const [networkId, setNetworkId] = useState("");
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [walletType, setWalletType] = useState("");
  const [sendDone, setSendDone] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [expired, setExpired] = useState("");
  const [finalLink, setFinalLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      setUserInfo(globalUserInfo);
    } else {
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/";
    }
  }, []);

  const StepList = [
    {
      id: 1,
      text: (
        <>
          토큰을 보낼 소셜 계정을
          <br />
          입력해주세요.
        </>
      ),
      component: Step1({
        setPlatform: setPlatform,
        setPlatformIcon: setPlatformIcon,
        setEmail: setEmail,
        setTrash: setTrash,
        email: email,
        urlInfo: "",
        platform: platform,
      }),
    },
    {
      id: 2,
      text: "",
      component: Step2({
        setWalletType: setWalletType,
        setAddress: setSenderAddress,
        setNetwork: setNetwork,
        setNetworkId: setNetworkId,
        setCurrency: setCurrency,
        setStepStatus: setStepStatus,
        walletType: walletType,
        address: senderAddress,
        network: network,
        networkId: networkId,
        currency: currency,
        email: email,
        platformIcon: platformIcon,
        userId: userInfo?.user?.user_id,
        stepStatus: stepStatus,
        userIdx: userInfo?.user?.index,
        setExpired: setExpired,
        setFinalLink: setFinalLink,
        setLoading: setLoading,
      }),
    },
    {
      id: 3,
      text: "",
      component: Step3({
        setAmount: setAmount,
        setCurrency: setCurrency,
        setToken: setToken,
        amount: amount,
        token: token,
        networkId: networkId,
        currency: currency,
        expired: expired,
        finalLink: finalLink,
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

  const headerRightOnClick = () => {
    setCancelModalOpen(true);
    console.log(cancelModalOpen);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const setRealDelete = () => {
    window.location.href = "/";
  };

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {cancelModalOpen ? (
            <DeleteModal
              visible={cancelModalOpen}
              closable={true}
              maskClosable={true}
              onClose={closeCancelModal}
              text={
                <>
                  지금까지 입력한 정보가
                  <br /> 모두 초기화됩니다. 초기화 하시겠어요?
                </>
              }
              setRealDelete={setRealDelete}
              buttonText={"초기화 하기"}
            />
          ) : (
            <></>
          )}
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
                  <SendTokenHeader
                    title="송금하기"
                    leftOnClick={leftOnClick}
                    rightOnClick={headerRightOnClick}
                  />
                  <ContentContainer>
                    <StepStatusBox>
                      {StepList.map((step, idx) => (
                        <>
                          {idx == 0 ? (
                            <>
                              {idx == stepStatus - 1 ? (
                                <StepingCircle>{step.id}</StepingCircle>
                              ) : (
                                <StepCircle>{step.id}</StepCircle>
                              )}
                            </>
                          ) : (
                            <>
                              {idx < stepStatus - 1 ? (
                                <>
                                  <StepLine />
                                  <StepCircle>{step.id}</StepCircle>
                                </>
                              ) : (
                                <>
                                  {idx == stepStatus - 1 ? (
                                    <>
                                      <StepUnLine />
                                      <StepingCircle>{step.id}</StepingCircle>
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
                          )}
                        </>
                      ))}
                    </StepStatusBox>
                    <StepHeader>{StepList[stepStatus - 1].text}</StepHeader>
                    <StepComponentBox>
                      {StepList[stepStatus - 1].component}
                    </StepComponentBox>
                    <StepButtonContainer>
                      {stepStatus == 1 ? (
                        <>
                          {email ? (
                            <ContainedButton
                              type="primary"
                              styles="filled"
                              states="default"
                              size="large"
                              label="다음"
                              onClick={rightOnClick}
                            />
                          ) : (
                            <ContainedButton
                              type="primary"
                              styles="filled"
                              states="disabled"
                              size="large"
                              label="다음"
                            />
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </StepButtonContainer>
                  </ContentContainer>
                </FullContainer>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SendTokenPage;
