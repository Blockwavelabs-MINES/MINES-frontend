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

const AccountListComponent = () => {
  const accountList = [
    {
      icon: TwitterIcon,
      text: "트위터",
      supported: true,
      connected: true,
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
                <div>
                  <div />
                </div>
              ) : (
                <div>연결안됨</div>
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
