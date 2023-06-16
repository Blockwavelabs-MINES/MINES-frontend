import {
  NavBarHome,
  NavBarHomeActive,
  NavBarLink,
  NavBarLinkActive,
  NavBarSend,
  NavBarSendActive,
} from "assets/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

function BottomNavBar() {
  const [currentPath, setCurrentPath] = useState("");
  const [hoveredTab, setHoveredTab] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        setCurrentPath("home");
        break;
      case "/sendToken":
        setCurrentPath("send");
        break;
      case "/accountLinking":
        setCurrentPath("link");
        break;
    }
  }, []);

  return (
    <NavBarContainer>
      <NavBarTabWrapper
        className={currentPath === "home" && hoveredTab === "" && "active"}
        onMouseEnter={() => setHoveredTab("home")}
        onMouseLeave={() => setHoveredTab("")}
        onClick={() => {
          window.location.href = "/";
        }}
        hoveredTab={hoveredTab}
      >
        <NavBarTab>
          {(currentPath === "home" || hoveredTab === "home") &&
          (hoveredTab === "home" || hoveredTab === "") ? (
            <>
              <img src={NavBarHomeActive} />
              <div>{t("bottomNavBar1")}</div>
            </>
          ) : (
            <img src={NavBarHome} />
          )}
        </NavBarTab>
      </NavBarTabWrapper>
      <NavBarTabWrapper
        className={currentPath === "send" && hoveredTab === "" && "active"}
        onMouseEnter={() => setHoveredTab("send")}
        onMouseLeave={() => setHoveredTab("")}
        onClick={() => {
          window.location.href = "/sendToken";
        }}
        hoveredTab={hoveredTab}
      >
        <NavBarTab>
          {(currentPath === "send" || hoveredTab === "send") &&
          (hoveredTab === "send" || hoveredTab === "") ? (
            <>
              <img src={NavBarSendActive} />
              <div>{t("bottomNavBar2")}</div>
            </>
          ) : (
            <img src={NavBarSend} />
          )}
        </NavBarTab>
      </NavBarTabWrapper>
      <NavBarTabWrapper
        className={currentPath === "link" && hoveredTab === "" && "active"}
        onMouseEnter={() => setHoveredTab("link")}
        onMouseLeave={() => setHoveredTab("")}
        onClick={() => {
          window.location.href = "/accountLinking";
        }}
        hoveredTab={hoveredTab}
      >
        <NavBarTab>
          {(currentPath === "link" || hoveredTab === "link") &&
          (hoveredTab === "link" || hoveredTab === "") ? (
            <>
              <img src={NavBarLinkActive} />
              <div>
                {" "}
                <div>{t("bottomNavBar3")}</div>
              </div>
            </>
          ) : (
            <img src={NavBarLink} />
          )}
        </NavBarTab>
      </NavBarTabWrapper>
    </NavBarContainer>
  );
}

export default BottomNavBar;

const NavBarContainer = styled.div`
  z-index: 50;
  display: flex;
  position: sticky;
  width: 90%;
  height: 76px;
  bottom: 24px;
  margin: 0 auto;
  padding: 10px 0 10px 10px;
  background-color: white;
  box-shadow: 0px 13px 40px rgba(39, 49, 70, 0.12);
  border-radius: 120px;
`;

const NavBarTabWrapper = styled.div`
  width: 68px;
  height: 68px;
  padding-right: 12px;
  transition-property: width;
  transition-duration: 0.5s;

  &.active {
    width: calc(100% - 136px);
  }

  &:hover {
    width: calc(100% - 136px);
  }

  &.active > div {
    background-color: ${palette.grey_1};
    width: 100%;
    border-radius: 40px;
  }

  &:hover > div {
    background-color: ${palette.grey_1};
    width: 100%;
    border-radius: 40px;
  }
`;

const NavBarTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  background-color: ${palette.grey_7};
  border: ${palette.grey_6} 1px solid;
  border-radius: 28px;
  cursor: pointer;

  & > div {
    ${Typography.Headline3}
    color: white;
    margin-left: 8px;
  }
`;
