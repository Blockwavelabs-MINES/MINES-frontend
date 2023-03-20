// import { store, useGlobalState } from "state-pool";
import React, { useState } from "react";
import TypographyEn from "./typographyEn";
import TypographyKo from "./typographyKo";

const Typography = () => {
  // const [language, setLanguage] = useState(
  //   JSON.parse(localStorage.getItem("language"))
  // );
  let language = localStorage.getItem("language");
  // const language = { lang: "en", id: 1 };
  // const language = { lang: "ko", id: 0 };
  if (!language) {
    language = { lang: "en" };
  }

  if (language.lang === "en") {
    console.log(language.lang);
    return TypographyEn;
  } else {
    console.log(language.lang);
    return TypographyKo;
  }
};

export default Typography();
