import {
  NavBarHome,
  NavBarHomeActive,
  NavBarLink,
  NavBarLinkActive,
  NavBarSend,
  NavBarSendActive,
} from "assets/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";

function BottomNavBar() {
  const [currentPath, setCurrentPath] = useState("");
  const [hoveredTab, setHoveredTab] = useState("");

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
          <img
            src={
              currentPath === "home" || hoveredTab === "home"
                ? NavBarHomeActive
                : NavBarHome
            }
          />
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
          <img
            src={
              currentPath === "send" || hoveredTab === "send"
                ? NavBarSendActive
                : NavBarSend
            }
          />
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
          <img
            src={
              currentPath === "link" || hoveredTab === "link"
                ? NavBarLinkActive
                : NavBarLink
            }
          />
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
`;
