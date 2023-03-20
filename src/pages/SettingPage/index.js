import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SettingHeader } from "../../components/header";
import { ListButton } from "../../components/button";
import { useTranslation } from "react-i18next";
import i18next from "../../utils/lang/i18n";
import { ChangeID, EnrolledAccount } from "./components";
import { changeUserLanguage } from "../../utils/api/auth";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const SettingPage = () => {
  const [status, setStatus] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language")
  );
  const { t } = useTranslation();
  const StatusList = ["changeID", "checkID", "setLanguage"];

  useEffect(() => {
    setCurrentLanguage(localStorage.getItem("language"));
  }, [localStorage.getItem("language")]);

  const langChange = () => {
    if (currentLanguage === "en") {
      i18next.changeLanguage("ko");
      localStorage.setItem("language", "ko");
      changeUserLanguage("KOR");
    } else {
      i18next.changeLanguage("en");
      localStorage.setItem("language", "en");
      changeUserLanguage("ENG");
    }
  };

  const SettingList = [
    {
      title: t("settingsPage1"),
      header: t("changeUserIdHeader"),
      icon: "",
      onClick: () => {
        setStatus("changeID");
      },
      select: "",
      component: <ChangeID />,
    },
    {
      title: t("settingsPage2"),
      header: t("socialAccountInfoHeader"),
      icon: "",
      onClick: () => {
        setStatus("checkID");
      },
      select: "",
      component: <EnrolledAccount />,
    },
    {
      title: t("settingsPage3"),
      header: t("languageSettingInfoHeader"),
      icon: "",
      // onClick: () => {
      //   setStatus("setLanguage");
      // },
      onClick: () => {
        langChange();
      },
      select:
        currentLanguage === "en"
          ? t("languageSettingInfo1")
          : t("languageSettingInfo2"),
      component: ChangeID,
    },
    {
      title: t("settingsPage4"),
      icon: "",
      onClick: () => {
        window.open(
          "https://www.notion.so/propwave/notice-10006b18d72f4d25a592223dcfb5c525"
        );
      },
      select: "",
    },
    {
      title: t("settingsPage5"),
      icon: "",
      onClick: () => {
        window.location.href =
          "https://propwave.notion.site/Terms-of-Service-2d8c34caef5d448d9523844e1790bc35";
      },
      select: "",
    },
    {
      title: t("settingsPage6"),
      icon: "",
      onClick: () => {
        window.location.href =
          "https://propwave.notion.site/Privacy-Policy-534c654c440f43b8884c35aa29097dc9";
      },
      select: "",
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/";
    }
  }, []);

  return (
    <FullContainer>
      <SettingHeader
        title={t("settingsPageHeader")}
        leftOnClick={() => {
          window.location.href = "/";
        }}
      />
      {status == "" ? (
        <>
          {SettingList.map((item, idx) => (
            <ListButton
              label={item.title}
              select={item.select}
              onClick={item.onClick}
            />
          ))}
        </>
      ) : (
        <>
          <SettingHeader
            title={SettingList[StatusList.findIndex((v) => v == status)].header}
            leftOnClick={() => {
              setStatus("");
            }}
          />
          {SettingList[StatusList.findIndex((v) => v == status)].component}
        </>
      )}
    </FullContainer>
  );
};

export default SettingPage;
