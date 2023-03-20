import React from "react";
import styled from "styled-components";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { useTranslation } from "react-i18next";
import { SorryImage } from "../../assets/images";
import { ContainedButton } from "../../components/button";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 200px;
`;

const IconImage = styled.img`
  width: 100px;
  height: 100px;
`;

const ErrorHeader = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
  ${Typography.Headline1}
  color: ${palette.grey_1};
  text-align: center;
`;

const ErrorBody = styled.div`
  ${Typography.Body}
  color: ${palette.grey_1};
  text-align: center;
  margin-bottom: 30px;
`;

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <FullContainer>
        <IconImage src={SorryImage} />
        <ErrorHeader>{t("notFoundPage1")}</ErrorHeader>
        <ErrorBody>{t("notFoundPage2")}</ErrorBody>
        <ContainedButton
          type="secondary"
          styles="outlined"
          states="default"
          size="medium"
          label={t("notFoundPage3")}
          style={{
            margin: "0px auto",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </FullContainer>
    </>
  );
};

export default NotFoundPage;
