import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import DropBox from "./Dropbox";
import MetamaskChainList from "./MetamaskChainlist";
import PlatformList from "./PlatformList";

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const PlatformBox = styled.div`
  width: 40%;
`;

const EmailBox = styled.div`
  width: 60%;
`;

const BoxHeader = styled.li`
  font-family: Pretendard;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.gray};
  margin-bottom: 4px;
`;

const EmailInputBox = styled.input`
  width: 100%;
  height: 37px;
  border-radius: 8px;
  padding-left: 12px;
  border: 1px solid ${palette.light_gray};
  font-family: Pretendard;
  font-size: 11px;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0em;
`;

const Step1 = ({
  setPlatform,
  email,
  setEmail,
  setTrash,
  urlInfo,
  platform,
}) => {
  const [Chainlist, setChainlist] = useState(MetamaskChainList);
  const [isSet, setIsSet] = useState(false);

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Container>
      <PlatformBox>
        <BoxHeader>Platform</BoxHeader>
        <DropBox
          setChainNetwork={setPlatform}
          setCurrency={setTrash}
          itemList={PlatformList}
          dropboxType="chain"
          realType="platform"
          //   isSet={isSet}
          //   urlInfo={urlInfo}
        />
      </PlatformBox>
      <EmailBox>
        <BoxHeader>{platform} email</BoxHeader>
        <EmailInputBox
          value={email}
          onChange={(e) => emailOnChange(e)}
          placeholder="abc@gmail.com"
        />
      </EmailBox>
    </Container>
  );
};

export default Step1;
