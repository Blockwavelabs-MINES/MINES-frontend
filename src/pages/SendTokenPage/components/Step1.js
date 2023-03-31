import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import DropBox from "./Dropbox";
import PlatformList from "./PlatformList";
import { InputBox } from "../../../components/input";
import { useTranslation } from "react-i18next";

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

const Step1 = ({ setPlatform, setPlatformIcon, email, setEmail }) => {
  const [platformIdx, setPlatformIdx] = useState(0);

  const { t } = useTranslation();

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
        <BoxHeader>{t("sendPage01_3")}</BoxHeader>
        <DropBox
          setIdx={setPlatformIdx}
          itemList={PlatformList}
          dropboxType="myEmail"
        />
      </PlatformBox>
      <EmailBox>
        <InputBox
          label={t("sendPage01_4")}
          state="filled"
          isRequired={false}
          placeholder={t("sendPage01_5")}
          value={email}
          height={51}
          onChange={(e) => emailOnChange(e)}
        />
      </EmailBox>
    </Container>
  );
};

export default Step1;
