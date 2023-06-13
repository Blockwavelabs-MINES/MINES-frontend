import React from "react";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import { NavBarHome, NavBarSend, NavBarLink } from "assets/icons";

function BottomNavBar() {
  return (
    <NavBarContainer>
      <NavBarTab>
        <img src={NavBarHome} />
      </NavBarTab>
      <NavBarTab>
        <img src={NavBarSend} />
      </NavBarTab>
      <NavBarTab>
        <img src={NavBarLink} />
      </NavBarTab>
    </NavBarContainer>
  );
}

export default BottomNavBar;

const NavBarContainer = styled.div`
  display: flex;
  z-index: 50;
  gap: 12px;
  position: sticky;
  bottom: 24px;
  margin: 0 auto;
  padding: 10px;
  width: 90%;
  height: 76px;
  background-color: white;
  box-shadow: 0px 13px 40px rgba(39, 49, 70, 0.12);
  border-radius: 120px;
`;

const NavBarTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  background-color: ${palette.grey_7};
  border: ${palette.grey_6} 1px solid;
  border-radius: 50%;
`;
