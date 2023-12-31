import axios from "axios";
import { privateHeaders, handleTokenExpired } from "./base";

// 링크 전체 조회
export const getLink = async(userId) => {
  let resultValue = 0;

  await axios.get(`/public/link?user_id=${userId}`)
    .then((res) => {
      resultValue = res.data.data;
    })
    
    return resultValue;
}

// 링크 생성
export const addLink = async (title, url) => {
  let returnValue = 0;

  await axios.post("/link/add",
      {
        linkTitle: title,
        linkUrl: url,
      },
      {
        headers: privateHeaders,
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

// 링크 삭제
export const deleteLink = async (linkId) => {
  let returnValue = 0;

  await axios.delete(`/link/${linkId}`, {
      headers: privateHeaders,
    })
    .then((res) => {
      returnValue = res.data;
    })
    .catch((error) => {
      handleTokenExpired(error);
    });

  return returnValue;
};

// 링크 업데이트
export const editLink = async (linkId, title, url) => {
  let returnValue;
  
  await axios.put(`/link/edit/${linkId}`,
    {
      linkTitle: title,
      linkUrl: url,
    },
    {
      headers: privateHeaders,
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
