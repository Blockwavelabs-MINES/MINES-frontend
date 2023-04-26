import { BrowserRouter, Route, Routes } from "react-router-dom";

export default (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" />
        <Route path="/components" />
        <Route path="/createLink" />
        <Route path="/editProfile" />
        <Route path="/sendToken" />
        <Route path="/@:id" />
      </Routes>
    </BrowserRouter>
  </div>
);
