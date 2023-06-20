import { useEffect } from "react";
import styled from "styled-components";
import { connectTwitter } from "utils/api/twitter";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const TwitterCallbackPage = () => {
  useEffect(async () => {
    const currentUrl = window.location.href;
    const twitterCode = currentUrl?.split("&code=")[1]?.split("&")[0];
    await connectTwitter(twitterCode).finally(() => {
      window.location.href = "/accountLinking";
    });
  }, []);

  return <FullContainer />;
};

export default TwitterCallbackPage;
