import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { connectTwitter } from "utils/api/twitter";
import { twitterJustConnectedState } from "utils/atoms/twitter";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const TwitterCallbackPage = () => {
  const setTwitterJustConnected = useSetRecoilState(twitterJustConnectedState);
  useEffect(async () => {
    const currentUrl = window.location.href;
    const twitterCode = currentUrl?.split("&code=")[1]?.split("&")[0];
    await connectTwitter(twitterCode)
      .then(() => {
        setTwitterJustConnected(true);
      })
      .finally(() => {
        window.location.href = "/accountLinking";
      });
  }, []);

  return <FullContainer />;
};

export default TwitterCallbackPage;
