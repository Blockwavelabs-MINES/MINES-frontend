import axios from "axios";
import { privateHeadersMultipart, handleTokenExpired } from "./base";

// (나의)프로필 꾸미기 정보 조회
export const getProfileDeco = async (userId) => {
  let returnValue = 0;
  
  await axios.get(`/public/user/profile/decorate?user_id=${userId}`)
  .then((res) => {
    returnValue = res.data.data;
  })
  .catch((error) => {
    console.log("getProfileDeco: ", error);
  })

  return returnValue;
};

// 프로필 꾸미기 정보 업데이트
export const editProfileDeco = async (formData) => {
  let returnValue;

  await axios.put(`/user/profile/decorate/edit`, 
    formData, 
    {
      headers: privateHeadersMultipart,
    }
  )
  .then((res) => {
    returnValue = res.data;
  })
  .catch((error) => {
    handleTokenExpired(error);
  });

  return returnValue;
};
