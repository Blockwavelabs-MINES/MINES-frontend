import styled from "styled-components";
import { ContainedButton } from "../button";
import Typography from "../../utils/style/Typography/index";
import { COLORS as palette } from "../../utils/style/Color/colors";
import { BottomModal } from ".";
import { SocialGoogle } from "../../assets/icons";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { setLocalUserInfo } from "../../utils/functions/setLocalVariable";
import {
  createUser,
  loginUser,
  getUserInfo,
  getInfoFromAccessToken,
  editProfile,
} from "../../utils/api/auth";
import { useTranslation } from "react-i18next";

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

const LoginModalInner = (type, setStatus, onClose) => {
  const { t } = useTranslation();

  const responseGoogle = async (accessToken) => {
    const getInfoFromAccessTokenResult = await getInfoFromAccessToken(
      accessToken
    ).then(async (res) => {
      const createUserResult = await createUser(res.email, "GOOGLE")
        .then(async (userInfo) => {
          const formData = new FormData();

          formData.append("profileImage", "");

          const formJson = {
            frontKey: process.env.REACT_APP_3TREE_API_KEY,
            jwtToken: JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCAL_USER_INFO_NAME)
            )?.jwtToken,
            profileName: res.name,
            profileBio: `${res.name}'s 3TREE page :)`,
          };

          formData.append("json", JSON.stringify(formJson));

          const editProfileResult = await editProfile(
            userInfo.user_id,
            formData
          );
          const loginUserResult = await loginUser(res.email)
            .then((data) => console.log(data))
            .then(() => {
              if (type == "receive") {
                setStatus(true);
              } else {
                window.location.href = "/createLink";
              }
              onClose();
            });
        })
        .catch(async (error) => {
          const loginUserResult = await loginUser(res.email)
            .then((data) => {
              console.log(data);
              if (!data) {
                alert("존재하지 않는 유저입니다.")
                window.location.href = "/"
              }
            })
            .then(() => {
              if (type == "receive") {
                setStatus(true);
              } else {
                window.location.href = "/";
              }
              onClose();
            });
        });
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      responseGoogle(codeResponse.access_token);
    },
  });

  const googleLoginOnClick = () => {
    console.log("hi");
    window.location.href = "/createLink";
  };
  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>{t("loginModal1")}</FirstIntro>
        <SecondIntro>
          {t("loginModal2")}
          <br />
          {t("loginModal2_2")}
        </SecondIntro>
      </IntroTextBox>
      {/* <GoogleLogin
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
      /> */}
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
      {/* <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
      > */}
      {/* <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.log("Login Failed");
          }}
        /> */}
      <ContainedButton
        type="secondary"
        styles="outlined"
        states="default"
        size="large"
        label={t("loginModal3")}
        icon={SocialGoogle}
        className={"googleButton"}
        onClick={login}
      />
      {/* </GoogleOAuthProvider> */}
      <TermsBox>
        {t("loginModal4")}
        <a>{t("loginModal5")}</a>
        {t("loginModal6")}
        <a>{t("loginModal7")}</a>
        {t("loginModal8")}
      </TermsBox>
    </FullContainer>
  );
};

const LoginModal = ({
  visible,
  closable,
  maskClosable,
  onClose,
  type,
  setStatus,
}) => {
  return (
    <BottomModal
      visible={visible}
      closable={closable}
      maskClosable={maskClosable}
      onClose={onClose}
      renderInput={() => LoginModalInner(type, setStatus, onClose)}
    />
  );
};

export default LoginModal;
