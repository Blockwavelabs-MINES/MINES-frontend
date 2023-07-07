import axios from "axios";
import { privateHeaders, handleTokenExpired } from "./base";

/* 
 param으로 userId를 받지만, 모든 호출의 userId는 자기 자신임
export const getLink = async (userId) => {
  let resultValue = 0;
  await axios.get(`/public/link/all?user_id=${userId}`).then((data) => {
    resultValue = data.data.resultData;
  });

  return resultValue;
};
*/
// 링크 전체 조회
export const getLink = async() => {
  let resultValue = 0;

  await axios.get('/link', {
    headers: privateHeaders,
  })
    .then((res) => {
      resultValue = res.data.data;
    })
    
    return resultValue;
}

export const addLink = async (title, url) => {
  let returnValue = 0;
  await axios
    .post(
      "/link/add",
      {
        linkTitle: title,
        linkUrl: url,
      },
      {
        headers: privateHeaders,
      }
    )
    .then((data) => {
      returnValue = data.data;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};

export const deleteLink = async (linkId) => {
  let returnValue = 0;
  await axios
    .delete(`/link/remove?link_id=${linkId}`, {
      headers: privateHeaders,
    })
    .then((data) => {
      returnValue = data.data;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};

export const editLink = async (linkId, title, url) => {
  let returnValue;
  await axios
    .put(
      "/link/edit",
      {
        id: linkId,
        title: title,
        url: url,
      },
      {
        headers: privateHeaders,
      }
    )
    .then((response) => {
      returnValue = response.data;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};
