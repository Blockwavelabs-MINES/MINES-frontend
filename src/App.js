import "./App.css";
import {
  ComponentTestPage,
  IntroPage,
  CreateLinkPage,
  EditProfilePage,
} from "./pages";
import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/functions/ScrollTop";
import { COLORS as palette } from "./utils/style/Color/colors";
import { useGlobalState, createStore } from "state-pool";
import "./utils/style/Font/font.css";

const store = createStore();

store.setState("language", { lang: "ko", id: 0 });

const BodyInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${palette.background};
  // background-color: ${palette.white};
`;

const WebAppContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  background-color: ${palette.white};
`;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BodyInner>
          <WebAppContainer>
            <ScrollToTop />
            <Routes>
              <Route exact path="/" element={<IntroPage />} />
              <Route path="/components" element={<ComponentTestPage />} />
              <Route path="/createLink" element={<CreateLinkPage />} />
              <Route path="/editProfile" element={<EditProfilePage />} />
            </Routes>
          </WebAppContainer>
        </BodyInner>
      </BrowserRouter>
    </div>
  );
}

export default App;
