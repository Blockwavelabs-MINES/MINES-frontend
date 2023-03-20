import axios from "axios";
import { privateHeaders, handleTokenExpired } from "./base";

export const getLink = async (userId) => {
  let resultValue = 0;
  await axios
    .get(
      process.env.REACT_APP_DB_HOST_NEW + `/public/link/all?user_id=${userId}`
    )
    .then((data) => {
      resultValue = data.data.resultData;
    });
  return resultValue;
};

export const addLink = async (title, url) => {
  let returnValue = 0;
  await axios
    .post(
      process.env.REACT_APP_DB_HOST_NEW + "/link/add",
      {
        link_title: title,
        link_url: url,
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
    .delete(
      process.env.REACT_APP_DB_HOST_NEW + `/link/remove?link_id=${linkId}`,
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

export const editLink = async (linkId, title, url) => {
  let returnValue;
  await axios
    .put(
      process.env.REACT_APP_DB_HOST_NEW + "/link/edit",
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
