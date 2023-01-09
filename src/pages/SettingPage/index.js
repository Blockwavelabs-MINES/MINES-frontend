import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SettingProfileHeader } from "../../components/header";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { getLocalUserInfo } from "../../utils/functions/setLocalVariable";
import { getUserInfo } from "../../utils/api/auth";
import { ListButton } from "../../components/button";
import { useTranslation } from "react-i18next";
import i18next from "../../utils/lang/i18n";

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

  useEffect(() => {
    if (!language) {
      setLanguage(LanguageNameList[1]);
      localStorage.setItem("language", JSON.stringify({ lang: "en", id: 1 }));
    } else {
      console.log(JSON.parse(localStorage.getItem("language"))?.id);
      console.log(LanguageList.length);
      console.log(JSON.parse(localStorage.getItem("language"))?.id % LanguageList.length);
      setLangKo(JSON.parse(localStorage.getItem("language"))?.id % LanguageList.length);
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
      icon: "",
      onClick: () => {
        setStatus("changeID");
      },
      select: "",
    },
    {
      title: t("settingsPage2"),
      icon: "",
      onClick: () => {
        setStatus("checkID");
      },
      select: "",
    },
    {
      title: t("settingsPage3"),
      icon: "",
      //   onClick: () => {
      //     setStatus("setLanguage");
      //   },
      onClick: () => {
        langChange();
      },
      select: t(LanguageList[langKo]),
    },
    {
      title: t("settingsPage4"),
      icon: "",
      onClick: () => {
        window.location.href = "/";
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
      <SettingProfileHeader info={userInfo} title={t("settingsPageHeader")} />
      {SettingList.map((item, idx) => (
        <ListButton
          label={item.title}
          select={item.select}
          onClick={item.onClick}
        />
      ))}
    </FullContainer>
  );
};

export default SettingPage;
