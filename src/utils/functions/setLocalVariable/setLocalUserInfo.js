const localUserInfoName = process.env.REACT_APP_LOCAL_USER_INFO_NAME;

const setLocalUserInfo = ({ type, data, editKey, editValue }) => {
  // type : "init" | "edit"
  if (type == "init") {
    localStorage.setItem(localUserInfoName, JSON.stringify(data));
  } else if (type == "edit") {
    var tmpData = localStorage.getItem(localUserInfoName);
    tmpData[editKey] = editValue;
    localStorage.setItem(localUserInfoName, JSON.stringify(tmpData));
  }
};

const dataForm = {
  userId: "",
  userToken: "",
  profileImg: "",
  introduction: "",
};

export default setLocalUserInfo;
