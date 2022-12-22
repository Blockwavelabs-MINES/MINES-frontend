import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SendTokenHeader, LoginHeader } from "../../../components/header";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import WalletComponent from "./WalletComponent";
import { getLocalUserInfo } from "../../../utils/functions/setLocalVariable";
import { getUserInfo } from "../../../utils/api/auth";
import ReceiveComplete from "./ReceiveComplete";
import LoadingComponent from "./LoadingComponent";

const ContentContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const TextBox = styled.div`
  padding-top: 124px;
  margin-bottom: 30px;
`;

const HeaderBox = styled.div`
  margin-bottom: 14px;
  ${Typography.Headline1}
  color: ${palette.Black};
`;

const SubtextBox = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
`;

const SelectWallet = ({ linkInfo }) => {
  const [userInfo, setUserInfo] = useState({});
  const [infoChange, setInfoChange] = useState(false);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiveInfo, setReceiveInfo] = useState({});

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    // if (globalUserInfo) {
    //   setUserInfo(globalUserInfo);
    // }
    console.log(globalUserInfo);
    (async () => {
      const getUserInfoResult = await getUserInfo(
        globalUserInfo.user.user_id
      ).then((data) => {
        console.log(data);
        setUserInfo(data);
      });
    })();
  }, [infoChange]);

  const leftOnClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      {complete ? (
        <ReceiveComplete receiveInfo={receiveInfo} />
      ) : (
        <>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <SendTokenHeader title="송금받기" leftOnClick={leftOnClick} />
              <ContentContainer>
                <TextBox>
                  <HeaderBox>송금 받을 지갑을 선택해주세요</HeaderBox>
                  <SubtextBox>
                    선택한 지갑으로 토큰을 받을 수 있어요!
                  </SubtextBox>
                </TextBox>
              </ContentContainer>
              <WalletComponent
                userInfoProps={userInfo}
                setInfoChange={setInfoChange}
                infoChange={infoChange}
                setComplete={setComplete}
                setReceiveInfo={setReceiveInfo}
                linkInfo={linkInfo}
                setLoading={setLoading}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default SelectWallet;
