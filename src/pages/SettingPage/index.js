import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SettingHeader } from "../../components/header";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";
import { getUserInfo } from "../../utils/api/auth";
import { ListButton } from "../../components/button";
import { useTranslation } from "react-i18next";
import i18next from "../../utils/lang/i18n";
import { ChangeID, EnrolledAccount } from "./components";

const FullContainer = styled.div`
  width: 100%;
  //   height: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const LanguageNameList = ["한국어", "영어"];

const SettingPage = () => {
  const [userInfo, setUserInfo] = useState();
  const [infoChange, setInfoChange] = useState(false);
  const [status, setStatus] = useState("");
  const [language, setLanguage] = useState(
    LanguageNameList[JSON.parse(localStorage.getItem("language"))?.id]
  );
  const [langKo, setLangKo] = useState(0);
  const { t } = useTranslation();

  const LanguageList = ["languageSettingInfo1", "languageSettingInfo2"];
  const StatusList = ["changeID", "checkID", "setLanguage"];

  useEffect(() => {
    if (!language) {
      setLanguage(LanguageNameList[1]);
      localStorage.setItem("language", JSON.stringify({ lang: "en", id: 1 }));
    } else {
      console.log(JSON.parse(localStorage.getItem("language"))?.id);
      console.log(LanguageList.length);
      console.log(
        JSON.parse(localStorage.getItem("language"))?.id % LanguageList.length
      );
      setLangKo(
        JSON.parse(localStorage.getItem("language"))?.id % LanguageList.length
      );
    }
  }, []);

  const languageSwitchOnClick = () => {
    var nextIdx = (language.id + 1) % LanguageList.length;
    setLanguage({ lang: LanguageList[nextIdx], id: nextIdx });
  };

  const langChange = () => {
    i18next.changeLanguage(langKo ? "ko" : "en");
    setLangKo((langKo + 1) % 2);
    localStorage.setItem(
      "language",
      JSON.stringify({ lang: langKo ? "ko" : "en", id: (langKo + 1) % 2 })
    );
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
      select: t(LanguageList[langKo]),
      component: ChangeID,
    },
    {
      title: t("settingsPage4"),
      icon: "",
      onClick: () => {
        window.open("https://www.notion.so/propwave/notice-10006b18d72f4d25a592223dcfb5c525")
      },
      select: "",
    },
    {
      title: t("settingsPage5"),
      icon: "",
      onClick: () => {
        window.location.href = "/";
      },
      select: "",
    },
    {
      title: t("settingsPage6"),
      icon: "",
      onClick: () => {
        window.location.href = "/";
      },
      select: "",
    },
  ];

  useEffect(() => {
    var globalUserInfo = getLocalUserInfo();
    if (globalUserInfo) {
      console.log(globalUserInfo);
      (async () => {
        const getUserInfoResult = await getUserInfo(
          globalUserInfo.user.user_id
        ).then((data) => {
          console.log(data);
          setUserInfo(data);
        });
      })();
    } else {
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/";
    }
  }, [infoChange]);

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
