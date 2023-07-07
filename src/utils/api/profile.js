import axios from "axios";
import { privateHeadersMultipart, handleTokenExpired } from "./base";

// (나의)프로필 꾸미기 정보 조회
export const getProfileDeco = async (userId) => {
  let returnValue = 0;
  
  await axios.get(`/user/profile/decorate/:${userId}`)
  .then((res) => {
    returnValue = res.data.data;
  })
  .catch((error) => {
    console.log("getProfileDeco: ", error);
  })

  return returnValue;
};

export const editProfileDeco = async (formData) => {
  let returnValue;
  await axios
    .put(`/profile/edit`, formData, {
      headers: privateHeadersMultipart,
    })
    .then((data) => {
      returnValue = data.data.resultData;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};
