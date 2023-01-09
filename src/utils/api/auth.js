import axios from "axios";
import { setLocalUserInfo } from "../functions/setLocalVariable";

export const createUser = async (socialID, socialPlatform) => {
  let returnValue = 0;
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST + `/users/signup`,
      `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "socialID":"${socialID}", "socialPlatform":"${socialPlatform}"}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
    });

  return returnValue;
};

export const loginUser = async (socialID) => {
  let returnValue = 0;
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST + `/users/login`,
      `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "socialId":"${socialID}"}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
      setLocalUserInfo({ type: "init", data: returnValue });
    });

  return returnValue;
};

export const checkUserId = async (userID) => {
  let returnValue = 0;
  const result = await axios
    .get(
      process.env.REACT_APP_DB_HOST +
        `/users/userId/validation?userId=${userID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result; //true : 이미 존재 | false : 존재하지 않음(굿)
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

export const editProfile = async (userID, formData) => {
  //   const formData = new FormData();
  //   formData.append(
  //     "json",
  //     `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "profileName":"${profileName}", "profileBio":"${profileBio}"}`
  //   );

  var requestOptions = {
    method: "PATCH",
    headers: {
      "Access-Control-Allow-Private-Network": true,
      "Access-Control-Request-Private-Network": true,
      // "Content-Type": "application/json",
    },
    body: formData,
    redirect: "follow",
  };

  let returnValue = {};

  const result = await fetch(
    process.env.REACT_APP_DB_HOST + `/users/userInfo?userId=${userID}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      returnValue = JSON.parse(result);
      console.log(returnValue);
      return returnValue;
    })
    .catch((error) => console.log("error", error));
};

export const getUserInfo = async (userId) => {
  let returnValue = 0;
  const result = await axios
    .get(process.env.REACT_APP_DB_HOST + `/users?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

export const getUserInfoByIndex = async (userIndex) => {
  let returnValue = 0;
  const result = await axios
    .get(
      process.env.REACT_APP_DB_HOST + `/users/userInfo?userIndex=${userIndex}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};

export const createUserId = async (newId, userIndex) => {
  var requestOptions = {
    method: "PATCH",
    headers: {
      //   "Access-Control-Allow-Private-Network": true,
      //   "Access-Control-Request-Private-Network": true,
      "Content-Type": "application/json",
    },
    body: `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "userId":"${newId}"}`,
    redirect: "follow",
  };

  let returnValue = {};

  const result = await fetch(
    process.env.REACT_APP_DB_HOST + `/users/userId?userIndex=${userIndex}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      returnValue = JSON.parse(result);
      console.log(returnValue);
    })
    .catch((error) => console.log("error", error));

  return returnValue;
};

export const getInfoFromAccessToken = async (accessToken) => {
  let returnValue = 0;
  const result = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      returnValue = data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return returnValue;
};
