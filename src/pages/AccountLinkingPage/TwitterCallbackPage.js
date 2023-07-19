import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { connectTwitter } from "utils/api/twitter";
import {
  receiveLinkState,
  sendSocialConnectState,
  twitterJustConnectedState,
} from "utils/atoms/twitter";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const TwitterCallbackPage = () => {
  const [receiveLink, setReceiveLink] = useRecoilState(receiveLinkState);
  const [sendSocialConnect, setSendSocialConnect] = useRecoilState(sendSocialConnectState);
  const setTwitterJustConnected = useSetRecoilState(twitterJustConnectedState);

  const requestConnectTwitter = async () => {
    const currentUrl = window.location.href;
    const twitterCode = currentUrl?.split("&code=")[1]?.split("&")[0];

    console.log(twitterCode);
    setTwitterJustConnected(true);
    await connectTwitter(twitterCode)
      .then((data) => {
        if (receiveLink) {
          console.log(data);
          const linkKey = receiveLink;
          setReceiveLink("");
          window.location.href = `/receiveToken/${linkKey}`;
        } 
        else if (sendSocialConnect) {
          setSendSocialConnect(false);
          window.location.href = "/sendToken";
        }
        else {
          window.location.href = "/accountLinking";
        }
      })

      .catch((e) => {
        console.log(e);
        window.location.href = "/accountLinking";
      });
  };

  useEffect(() => {
    requestConnectTwitter();
  }, []);

  return <FullContainer />;
};

export default TwitterCallbackPage;
