import "./App.css";
import {
  ComponentTestPage,
  IntroPage,
  CreateLinkPage,
  EditProfilePage,
  ProfilePage,
  SendTokenPage,
  ReceiveTokenPage,
  SettingPage,
  NotFoundPage,
} from "./pages";
import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/functions/ScrollTop";
import { COLORS as palette } from "./utils/style/Color/colors";
import "./utils/style/Font/font.css";
import { RecoilRoot } from "recoil";

const BodyInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${palette.background};
  // background-color: ${palette.white};
`;

const WebAppContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  background-color: ${palette.white};
  // position: absolute;
`;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <BodyInner>
            <WebAppContainer>
              <ScrollToTop />
              <Routes>
                <Route exact path="/" element={<IntroPage />} />
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/components" element={<ComponentTestPage />} />
                {/* <Route path="/createLink" element={<CreateLinkPage />} /> */}
                <Route path="/editProfile" element={<EditProfilePage />} />
                <Route path="/sendToken" element={<SendTokenPage />} />
                <Route
                  path="/receiveToken/:key"
                  element={<ReceiveTokenPage />}
                />
                <Route path="/@:id" element={<ProfilePage />} />
                <Route path="/*" element={<NotFoundPage />} />
              </Routes>
            </WebAppContainer>
          </BodyInner>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
