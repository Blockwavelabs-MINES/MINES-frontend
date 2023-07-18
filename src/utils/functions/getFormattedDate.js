/*
*   현재 시간을 불러와서 트위터의 형식에 맞게 포맷된 시간 데이터 반환
*/

const convertDateFormatTwitter = (date) => {
  const dateArr = date.substring(4, 33).split(" ");
  let monthNamesEn = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  let monthNamesKo = {
    Jan: "1",
    Feb: "2",
    Mar: "3",
    Apr: "4",
    May: "5",
    Jun: "6",
    Jul: "7",
    Aug: "8",
    Sep: "9",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  if (localStorage.getItem("language") === "en") {
    return (
      dateArr[3].substring(0, 5) +
      " on " +
      monthNamesEn[date[0]] +
      " " +
      dateArr[1] +
      ", " +
      dateArr[2] +
      " (" +
      dateArr[4].substring(0, 6) +
      ":" +
      dateArr[4].substring(6, 8) +
      ")" +
      "\n"
    );
  } else {
    return (
      dateArr[2] +
      "년 " +
      monthNamesKo[dateArr[0]] +
      "월 " +
      dateArr[1] +
      "일 " +
      dateArr[3].substring(0, 5) +
      " (" +
      dateArr[4].substring(0, 6) +
      ":" +
      dateArr[4].substring(6, 8) +
      ")" +
      "\n"
    );
  }
};

const getFormattedDate = () => {
  const date = new Date().toString();
  const formattedDate = convertDateFormatTwitter(date);

  return formattedDate;
}
 
export default getFormattedDate;