const localUserInfoName = process.env.REACT_APP_LOCAL_USER_INFO_NAME;

const getLocalUserInfo = () => {
  return localStorage.getItem(localUserInfoName);
};

export default getLocalUserInfo;
