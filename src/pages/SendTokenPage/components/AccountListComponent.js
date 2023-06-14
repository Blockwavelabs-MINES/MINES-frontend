import { DiscordIcon, TelegramIcon, TwitterIcon } from "assets/icons";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const AccountListContainer = styled.div`
  min-width: 350px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const AccountInfo = styled.div`
  display: flex;
`;

const AccountIcon = styled.img`
  width: 32px;
  margin: 0 8px;
`;

const AccountName = styled.div`
  ${Typography.Body};
  margin-left: 4px;
`;

const AccountStatus = styled.div`
  ${Typography.Headline3};
  color: ${palette.grey_2};
`;

const LinkAccount = styled.div`
  ${Typography.Headline3};
  color: ${palette.blue_1};
  cursor: pointer;
`;

const RadioButtonLabel = styled.label`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
`;

const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  &:checked + ${RadioButtonLabel} {
    background: ${palette.blue_1};
    border: 1px solid ${palette.blue_1};
    box-shadow: 0 0 0 4px #fff inset;
  }
`;

const AccountListComponent = () => {
  const accountList = [
    {
      icon: TwitterIcon,
      text: "트위터",
      supported: true,
      connected: false,
    },
    {
      icon: TelegramIcon,
      text: "텔레그램",
      supported: false,
    },
    {
      icon: DiscordIcon,
      text: "디스코드",
      supported: false,
    },
  ];

  return (
    <>
      {accountList.map((account) => {
        return (
          <AccountListContainer>
            <AccountInfo>
              <AccountIcon src={account.icon} alt={account.text} />
              <AccountName>{account.text}</AccountName>
            </AccountInfo>
            {account.supported ? (
              account.connected ? (
                <>
                  <RadioButton type="radio" name="radio" checked={true} />
                  <RadioButtonLabel />
                </>
              ) : (
                <LinkAccount
                  onClick={() => {
                    window.location.href = "/accountLinking";
                  }}
                >
                  계정 연동
                </LinkAccount>
              )
            ) : (
              <AccountStatus>지원 예정입니다</AccountStatus>
            )}
          </AccountListContainer>
        );
      })}
    </>
  );
};

export default AccountListComponent;
