import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import DropBox from "./Dropbox";
import MetamaskChainList from "./MetamaskChainlist";
import PlatformList from "./PlatformList";
import { InputBox } from "../../../components/input";

const Container = styled.div`
  width: 100%;
`;

const PlatformBox = styled.div`
  width: 100%;
`;

const EmailBox = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const BoxHeader = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_3};
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
  setPlatformIcon,
  email,
  setEmail,
  setTrash,
  urlInfo,
  platform,
}) => {
  const [Chainlist, setChainlist] = useState(MetamaskChainList);
  const [isSet, setIsSet] = useState(true);
  const [isInit, setIsInit] = useState(true);
  const [platformIdx, setPlatformIdx] = useState(0);

  useEffect(() => {
    setIsSet(false);
  }, [platform]);

  useEffect(() => {
    setPlatform(PlatformList[platformIdx].emailName);
    setPlatformIcon(PlatformList[platformIdx].emailIcon);
  }, [platformIdx]);

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Container>
      <PlatformBox>
        <BoxHeader>Platform</BoxHeader>
        <DropBox
          setIdx={setPlatformIdx}
          itemList={PlatformList}
          dropboxType="myEmail"
        />
      </PlatformBox>
      <EmailBox>
        <InputBox
          label="Social Account"
          state="filled"
          isRequired={false}
          placeholder="3tree@gmail.com"
          value={email}
          height={51}
          onChange={(e) => emailOnChange(e)}
        />
      </EmailBox>
    </Container>
  );
};

export default Step1;
