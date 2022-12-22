import axios from "axios";

export const addLink = async (userId, linkTitle, linkUrl) => {
  let returnValue = 0;
  const result = await axios
    .post(
      process.env.REACT_APP_DB_HOST + `/links/new?userId=${userId}`,
      `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "linkTitle":"${linkTitle}", "linkUrl":"${linkUrl}"}`,
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

export const deleteLink = async (linkIndex) => {
  let returnValue = 0;
  const result = await axios
    .delete(process.env.REACT_APP_DB_HOST + `/links?linkIndex=${linkIndex}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      console.log(data.data);
      returnValue = data.data.result;
    });

  return returnValue;
};

export const editLink = async (linkIndex, linkTitle, linkUrl) => {
  var requestOptions = {
    method: "PATCH",
    headers: {
      // "Access-Control-Allow-Private-Network": true,
      // "Access-Control-Request-Private-Network": true,
      "Content-Type": "application/json",
    },
    body: `{"frontKey":"${process.env.REACT_APP_3TREE_API_KEY}", "linkTitle":"${linkTitle}", "linkUrl":"${linkUrl}"}`,
    redirect: "follow",
  };

  let returnValue = {};

  const result = await fetch(
    process.env.REACT_APP_DB_HOST + `/links?linkIndex=${linkIndex}`,
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
