import styled from "styled-components";
import { ContainedButton } from "../../components/button";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { BottomModal } from "../../components/modal";
import { SocialGoogle } from "../../assets/icons";
import { GoogleLogin } from "react-google-login";
// import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { setLocalUserInfo } from "../../utils/functions/setLocalVariable";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  //   margin-top: 109px;
  padding: 20px;
  z-index: 903;
`;

const IntroTextBox = styled.div`
  width: 100%;
  margin: 0px auto;
  padding-top: 100px;
  margin-bottom: 45px;
`;

const FirstIntro = styled.div`
  ${Typography.Headline1}
  color: ${palette.Black};
  line-height: 33.35px;
`;

const SecondIntro = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
  line-height: 23.8px;
  margin-top: 14px;
`;

const TermsBox = styled.div`
  margin-top: 64px;
  ${Typography.Caption2}
  color: ${palette.grey_5};
`;

const LoginModalInner = () => {
  const responseGoogle = (response) => {
    console.log(response);

    const userData = {
      userId: "Sejin Jung",
      userToken: "",
      profileImg: "",
      introduction:
        "Product ManagerProduct Manager & Designer @BlockwaveLabs | HackATOM Seoul Winner @0xMEPE | Member of medium.com/jewelboxdao | Design, Web3, NFT, Front-end and Future✨",
    };

    setLocalUserInfo({ type: "init", data: userData });

    window.location.href = "/createLink";
  };

  const googleLoginOnClick = () => {
    console.log("hi");
    window.location.href = "/createLink";
  };
  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>3Tree 시작하기</FirstIntro>
        <SecondIntro>
          나만의 링크를 생성하고
          <br /> 디지털 아이덴티티를 확장해보세요
        </SecondIntro>
      </IntroTextBox>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <ContainedButton
            type="secondary"
            styles="outlined"
            states="default"
            size="large"
            label="구글로 시작하기"
            icon={SocialGoogle}
            className={"googleButton"}
            onClick={() => {
              renderProps.onClick();
              //   googleLoginOnClick();
            }}
          />
        )}
      />
      {/* <ContainedButton
        type="secondary"
        styles="outlined"
        states="default"
        size="large"
        label="구글로 시작하기"
        icon={SocialGoogle}
        className={"googleButton"}
        onClick={googleLoginOnClick}
      /> */}
      {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider> */}
      <TermsBox>
        로그인은 <a>개인정보 보호 정책</a> 및 <a>서비스 약관</a>에 동의하는 것을
        의미하며, 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
      </TermsBox>
    </FullContainer>
  );
};

const LoginModal = ({ visible, closable, maskClosable, onClose }) => {
  return (
    <BottomModal
      visible={visible}
      closable={closable}
      maskClosable={maskClosable}
      onClose={onClose}
      renderInput={LoginModalInner}
    />
  );
};

export default LoginModal;
